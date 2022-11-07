import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import axios from "../../API/RoyalApi";

import Header from "../../Components/Header";
import EndPoints from "../../API/EndPoints";

import { WebView } from "react-native-webview";
import FastImage from "react-native-fast-image";
import VideoApi from "../../API/VideoApi";

const Episodes = ({ route }) => {
  const { Data } = route.params;

  // Codigo do video Player
  const [videoUrl, setVideoUrl] = useState("");
  const [headers, setHeaders] = useState({});
  const [playerVisible, setPlayerVisible] = useState("none");

  const [playerIdArray, setPlayerIdArray] = useState([]);

  const [episodes, setEpisodes] = useState([]);
  const [episodePoster, setEpisodePoster] = useState("");

  async function fetchs() {
    console.log(`${EndPoints.seriesRel}${Data.seriesImdbid}&${Data.season}`);
    try {
      const request = await axios
        .get(`${EndPoints.seriesRel}${Data.seriesImdbid}&${Data.season}`, {
          headers: {
            Accept: "application/json",
            "User-Agent": "axios 0.21.1",
          },
        })
        .then(e => {
          setEpisodes(e.data.seasonsEpisodes.Episodes);
          return e.data.seasonsEpisodes;
        });

      setEpisodePoster(request.Episodes[0].poster);
      return request;
    } catch (error) {
      console.log("ERROR");
      // console.log(error.message);
    }
  }

  const final = {
    uri: `https://image.tmdb.org/t/p/original${episodePoster}`,
    priority: FastImage.priority.normal,
  };

  useEffect(() => {
    fetchs();
  }, []);

  /**
   * Irá formatar o nome do episódio para ficar em um padrão só, exemplo:
   *
   * 1x1 -> 1x01
   * 1x2 -> 1x02
   * 1x5 -> 1x05
   * 1x10 -> 1x10
   * 1x15 -> 1x15
   * 1x47 -> 1x47
   * @param {String} name
   * @return {String}
   */
  function formatName(name) {
    let parts = name.split("x", 2);
    let newName = parts[0] + "x";

    if (parts[1].length === 1) {
      newName = newName + "0" + parts[1];
    } else {
      newName = newName + parts[1];
    }

    return newName;
  }

  return (
    <View style={styles.body}>
      <Header />
      <View style={styles.container}>

        <View style={styles.warnTxt}>
          <Text style={styles.warnTxt1}>
            Episódios da {Data.season}ª Temporada{" "}

          </Text>
        </View>

        <View style={styles.videoPlayer}>
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              height: "100%",
              maxHeight: 250,
              marginBottom: 0,
              display: playerVisible,
            }}>
            {videoUrl ? (
              <WebView
                source={{
                  uri: videoUrl,
                  headers: headers,
                }}
                allowsFullscreenVideo={true}
                style={{ flex: 1, width: "100%", height: "100%" }}></WebView>
            ) : (
              <View />
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: "20%",
            padding: 3,
            // marginBottom: 4,
          }}>
          {playerIdArray?.filter((item) => {
            return item.player.name !== undefined;
          }).map((item, i) => (
            <TouchableOpacity
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 20,
                paddingVertical: 4,
                marginHorizontal: 8,
                borderRadius: 4,
                // marginBottom: 4,
              }}
              key={i}
              onPress={() => {
                (async () => {
                  let response = await VideoApi.loadVideo(
                    item.playerId, item.player.name,
                  );

                  if (response.videoUrl != null) {
                    setHeaders(response.headers);
                    setVideoUrl(response.videoUrl);
                    setPlayerVisible("flex");
                  } else {
                    setHeaders({});
                    setVideoUrl(null);
                    setPlayerVisible("none");
                  }
                })();
              }}>
              <Text> {item.player.name} </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          horizontal
          style={{
            width: "100%",
            // height: 250,
          }}
          contentContainerStyle={{ minWidth: 150 }}
        >
          <View style={[styles.episodesContainer]}>
            {episodes?.filter((item) => {
              return item.playerId !== undefined;
            }).sort((a: { name: String }, b: { name: String }) => formatName(a.name).localeCompare(formatName(b.name))).map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setPlayerIdArray(JSON.parse(item.playerId));
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
    </View>
  )
    ;
};

export default Episodes;
