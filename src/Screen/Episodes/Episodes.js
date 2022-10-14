import {
  Text,
  View,
  ScrollView,
  ToastAndroid,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './Styles';
import axios from '../../API/RoyalApi';

import Header from '../../Components/Header';
import EndPoints from '../../API/EndPoints';

import { WebView } from 'react-native-webview';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';

const Episodes = ({ navigation, route }) => {
  const { Data, Update } = route.params;
  const { width, height } = Dimensions.get('screen');

  // Codigo do video Player
  const [videoUrl, setVideoUrl] = useState('');
  const [headers, setHeaders] = useState({});
  const [playerVisible, setPlayerVisible] = useState('none');

  const [playerIdArray, setPlayerIdArray] = useState([]);

  const [episodes, setEpisodes] = useState([]);
  const [episodePoster, setEpisodePoster] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerLink, setPlayerLink] = useState('');
  const [playerName, setPlayerName] = useState('');

  async function fetchs() {
    try {
      const request = await axios
        .get(`${EndPoints.seriesRel}${Data.seriesImdbid}&${Data.season}`, {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'axios 0.21.1',
          },
        })
        .then(e => {
          setEpisodes(e.data.seasonsEpisodes.Episodes);
          return e.data.seasonsEpisodes;
        });

      let Id = JSON.parse(request.Episodes[0].playerId);
      setPlayerIdArray(Id);
      setEpisodePoster(request.Episodes[0].poster);
      return request;
    } catch (error) {
      console.log('ERROR');
      // console.log(error.message);
    }
  }



  async function processFembed(url) {
    try {
      let urls = url.split('/');
      let id = urls[urls.length - 1];
      return await axios
        .post(`https://vanfem.com/api/source/${id}`, {})
        .then(res => {
          // console.log(`Fembed Request of '${res.request.url}': ${res.status}`);
          return res.data.data[0].file;
        });
    } catch (error) {
      console.error(error.message);
    }
  }

  function doodRandomstr(length) {
    let ab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let ab_len = ab.length;

    let sb = '';

    for (let i = 0; i < length; i++) {
      sb += ab[Math.trunc(Math.random() * ab_len)];
    }

    return sb;
  }

  async function processDood(url) {
    let url_base = 'https://dood.to/';

    let [md5Url, urlPart2] = await axios.get(url).then(res => {
      let html = res.data;

      return [
        RegExp("\\$\\.get\\('(\\/pass_md5[/\\d-\\w]+)'").exec(html)[1],
        RegExp('makePlay.+?return[^?]+([^"]+)').exec(html)[1],
      ];
    });

    let urlPart = await axios
      .get(url_base + md5Url, {
        headers: {
          Referer: url,
        },
      })
      .then(res => {
        return res.data;
      });



    return urlPart + doodRandomstr(10) + urlPart2 + Date.now() / 100;
  }



  async function processStreamTape(url) {
    let [token, urlPart] = await axios
      .get(url, {
        headers: {
          Accept: '*/*',
          'User-Agent':
            'Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36 ',
        },
      })
      .then(res => {
        let html = res.data;
        return [
          html
            .match(RegExp('<script>[\\r\\n\\s\\S]+?</script>', 'g'))
            .join('')
            .match(RegExp("&token=([^s]*)'\\)"))[1],
          RegExp(`<div\\s+id="ideoolink"[\\s\\w="':;]+>(.+)</div>`, 'g').exec(
            html,
          )[1],
        ];
      });

    return (
      'https:/' +
      urlPart.substring(0, urlPart.lastIndexOf('=')) +
      '=' +
      token +
      '&stream=1'
    );
  }



  const BG = {
    uri: `https://image.tmdb.org/t/p/original${episodePoster}`,
    priority: FastImage.priority.normal,
  };

  const final = BG;

  async function loadVideo() {
    try {
      let urlVideo = '';
      let urlStream = '';

      switch (playerName) {
        case 'Fembed':
          urlVideo = `https://suzihaza.com/v/${playerId}`;
          urlStream = await processFembed(urlVideo);

          ToastAndroid.show(urlVideo, ToastAndroid.LONG);

          // console.log('URL-VIDEO: ' + urlVideo);
          // console.log(`URL-STREAM: ${String.raw`${urlStream}`}`);
          setHeaders({
            Referer: urlVideo,
            origin: playerLink,
          });
          setVideoUrl(urlStream);
          break;

        case 'StreamSb':
          urlVideo = `https://sbfull.com/e/${playerId}`;
          urlStream = await processStreamTape(urlVideo);
          ToastAndroid.show(urlVideo, ToastAndroid.LONG);

          // console.log('URL-VIDEO: ' + urlVideo);
          // console.log(`URL-STREAM: ${String.raw`${urlStream}`}`);
          setHeaders({
            Referer: urlVideo, //origin: playerLink,
          });
          setVideoUrl(urlStream);
          break;

        case 'Dood':
          urlVideo = `https://dood.to/e/${playerId}`;
          urlStream = await processDood(urlVideo);
          ToastAndroid.show(urlVideo, ToastAndroid.LONG);

          // console.log('URL-VIDEO: ' + urlVideo);
          // console.log(`URL-STREAM: ${String.raw`${urlStream}`}`);
          setHeaders({
            Referer: urlVideo,
          });
          setVideoUrl(urlStream);
          break;

        default:
          return;
      }

      setPlayerVisible('flex');
    } catch (e) {
      ToastAndroid.show('Error in load video', ToastAndroid.LONG);
      setPlayerVisible('none');
      setHeaders({});
      setVideoUrl(null);
    }

    /* //let urlVideo = 'https://suzihaza.com/v/2dl2zf26k-8wgqq'; // fembed
        //urlVideo = 'https://sbfull.com/e/dxfvlu4qanjx'; // streamSb
        //urlVideo = 'https://dood.to/e/zeb6gsq889qs'; // dood
        //let urlVideo = `https://suzihaza.com/v/p18p6smpzw7-67l`; //steamtape
        //urlStream = await processStreamTape(urlVideo); // basta remover https://suzihaza.com/v/
        //let urlStream = await processFembed(urlVideo); // basta remover https://suzihaza.com/v/
        urlStream = await processDood(urlVideo); // basta remover https://suzihaza.com/v/
        ToastAndroid.show(urlVideo, ToastAndroid.LONG);
        console.log('URL-VIDEO: ' + urlVideo);
        console.log(`URL-STREAM: ${String.raw`${urlStream}`}`);

        setHeaders({
          Referer: urlVideo,
        });
        setVideoUrl(urlStream); */
  }

  useEffect(() => {
    fetchs();
    loadVideo();
  }, []);



  console.log(final)


  console.log(videoUrl)

  return (
    <View style={styles.body}>
      <Header />
      <ScrollView style={styles.scrollBody}>
        <View style={styles.container}>


          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: '20%',
              padding: 3,
              marginBottom: 4,
            }}>
            {playerIdArray.map((item, i) => (
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 20,
                  paddingVertical: 4,
                  marginHorizontal: 8,
                  borderRadius: 4,
                  marginBottom: 4,
                }}
                key={i}
                onPress={() => {
                  setPlayerId(item.playerId);
                  setPlayerName(item.player.name);
                  // setPlayerName(item.player.link);
                }}>
                <Text> {item.player.name} </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.posterContainer}>
            <FastImage
              resizeMode="cover"
              source={{ uri: final.uri }}
              style={styles.poster}
            />
          </View>

          <View style={styles.warnTxt}>
            <Text style={styles.warnTxt1}>
              Episódios da {Data.season}ª Temporada{' '}

            </Text>
          </View>

          <View style={styles.videoPlayer}>
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                maxHeight: 250,
                marginBottom: 0,
                display: playerVisible,
              }}>
              {playerName ? (
                <WebView
                  source={{
                    uri: videoUrl,
                    headers: headers,
                  }}
                  allowsFullscreenVideo={true}
                  style={{ flex: 1, width: '100%', height: '100%' }}></WebView>
              ) : (
                <View />
              )}
            </View>
          </View>


          <ScrollView
            horizontal
            style={{
              width,
            }}>
            <View style={[styles.episodesContainer, { width }]}>
              {episodes?.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {

                    }}
                    key={item.id}
                    style={styles.episodeCard}>
                    <View style={styles.posterEpisodeContainer}>
                      <FastImage
                        resizeMode="cover"
                        source={{ uri: final.uri }}
                        style={styles.poster}
                      />
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.txt1}> {item.name} </Text>
                      <Text style={styles.txt1}> {item.duration} </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Episodes;
