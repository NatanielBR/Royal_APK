import axios from "./RoyalApi";
import { ToastAndroid } from "react-native";

function doodRandomstr(length) {
  let ab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let ab_len = ab.length;

  let sb = "";

  for (let i = 0; i < length; i++) {
    sb += ab[Math.trunc(Math.random() * ab_len)];
  }

  return sb;
}

async function processFembed(url) {
  try {
    let urls = url.split("/");
    let id = urls[urls.length - 1];
    return await axios
      .post(`https://vanfem.com/api/source/${id}`, {})
      .then((res) => {
        return res.data.data[0].file;
      });
  } catch (error) {
    console.error(error.message);
  }
}

async function processDood(url) {
  let url_base = "https://dood.to/";

  let [md5Url, urlPart2] = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:105.0) Gecko/20100101 Firefox/105.0",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
      "Accept-Encoding": "gzip, deflate, br",
      "Alt-Used": "dood.re",
      "Connection": "keep-alive",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "TE": "trailers",
    },
    responseType: "arraybuffer",
    decompress: true,
  })
    .catch((err) => {
      console.log(err.request._header);
      console.error(err.response.data);
    }).then((res) => {
      let html = res.data;

      return [
        RegExp("\\$\\.get\\('(\\/pass_md5[/\\d-\\w]+)'").exec(html)[1],
        RegExp("makePlay.+?return[^?]+([^\"]+)").exec(html)[1],
      ];
    });

  let urlPart = await axios
    .get(url_base + md5Url, {
      headers: {
        Referer: url,
      },
    })
    .then((res) => {
      return res.data;
    });

  return urlPart + doodRandomstr(10) + urlPart2 + Date.now() / 100;
}

async function processStreamTape(url) {
  let [token, urlPart] = await axios
    .get(url, {
      headers: {
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36 ",
      },
    })
    .then((res) => {
      let html = res.data;
      return [
        html
          .match(RegExp("<script>[\\r\\n\\s\\S]+?</script>", "g"))
          .join("")
          .match(RegExp("&token=([^s]*)'\\)"))[1],
        RegExp("<div\\s+id=\"ideo{2,}link\"[\\s\\w=\"':;]+>(.+)</div>", "g").exec(
          html,
        )[1],
      ];
    });

  return (
    "https:/" +
    urlPart.substring(0, urlPart.lastIndexOf("=")) +
    "=" +
    token +
    "&stream=1"
  );
}

/**
 * Irá carregar o video dependendo do playerId e do playerName
 * @param playerId
 * @param playerName
 * @returns {Promise<{headers: {}, videoUrl: ?string}>}
 */
async function loadVideo(playerId, playerName) {
  let response = {
    "videoUrl": null,
    "headers": {},
  };

  try {
    let urlVideo = "";
    let urlStream = "";

    switch (playerName) {
      case "Fembed":
        urlVideo = `${playerId}`;
        urlStream = await processFembed(urlVideo);

        // ToastAndroid.show(urlVideo, ToastAndroid.LONG);

        // console.log('URL-VIDEO: ' + urlVideo);
        // console.log(`URL-STREAM: ${String.raw`${urlStream}`}`);
        // setHeaders({
        //   Referer: urlVideo,
        //   origin: playerLink,
        // });
        response["videoUrl"] = urlStream;
        break;

      case "StreamTape":
        urlVideo = playerId;
        urlStream = await processStreamTape(urlVideo);
        // ToastAndroid.show(urlVideo, ToastAndroid.LONG);

        // console.log('URL-VIDEO: ' + urlVideo);
        // console.log(`URL-STREAM: ${String.raw`${urlStream}`}`);
        response["videoUrl"] = urlStream;
        break;

      case "Dood":
        urlVideo = `https://dood.to/e/${playerId}`;
        urlStream = await processDood(urlVideo);
        // ToastAndroid.show(urlVideo, ToastAndroid.LONG);

        // console.log('URL-VIDEO: ' + urlVideo);
        // console.log(`URL-STREAM: ${String.raw`${urlStream}`}`);
        response["headers"] = {
          Referer: urlVideo, //origin: playerLink,
        };
        response["videoUrl"] = urlStream;
        break;

      default:
        return;
    }
  } catch (e) {
    ToastAndroid.show("Error in load video", ToastAndroid.LONG);
    console.error(e);
    response["videoUrl"] = null;
    response["headers"] = {};
  }

  return response;
}

export default {
  processFembed,
  processDood,
  processStreamTape,
  loadVideo,
};
