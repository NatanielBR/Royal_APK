import VideoApi from "../API/VideoApi";
import axios from "axios";

test("Process Fembed", async () => {
  let url = "https://vanfem.com/v/qqq12ncerx2yjex1";

  let result = await VideoApi.processFembed(url);
  let data = await axios.head(result)

  expect(data.headers["content-type"]).toBe("video/mp4");
});


test("Process StreamTape", async () => {
  let url = "https://streamtape.com/v/Zyly2Og1ZLiq2gW/Minions.2.A.Origem.de.Gru.2022.1080p.BRRip.DD5.1.x264-SURGE.DUAL-GoT.mkv.mp4";

  let result = await VideoApi.processStreamTape(url);
  let data = await axios.head(result)

  expect(data.headers["content-type"]).toBe("video/mp4");
});
