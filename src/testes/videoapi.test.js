import VideoApi from "../API/VideoApi";
import axios from "axios";

test("Process Fembed", async () => {
  let url = "https://vanfem.com/v/qqq12ncerx2yjex1";

  let result = await VideoApi.processFembed(url);
  let data = await axios.head(result)

  expect(data.headers["content-type"]).toBe("video/mp4");
});


test("Process StreamTape", async () => {
  let url = "https://streamtape.com/v/d3Kk1JLXXeCkRPD/%5BDollars_Fansub%5D_KILL_la_KILL_-_01_%5BH264%5D%5BAAC%5D%5BHDTV%5D%5B10bit%5D%5BBF014FD4%5D.filewarez.tv.mkv";

  let result = await VideoApi.processStreamTape(url);
  let data = await axios.head(result)

  expect(data.headers["content-type"]).toBe("video/mp4");
});
