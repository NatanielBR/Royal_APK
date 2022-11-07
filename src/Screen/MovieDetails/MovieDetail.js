/* eslint-disable */
// noinspection JSObjectNullOrUndefined

import React, { useEffect, useState } from "react";
import { PermissionsAndroid, ScrollView, Share, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import * as Animatable from "react-native-animatable";
import FastImage from "react-native-fast-image";

// noinspection ES6UnusedImports
import GoogleCast, { CastButton, MediaStreamType, useRemoteMediaClient, RemoteMediaClient } from "react-native-google-cast";

import Header from "../../Components/Header";
import MovieRow from "../../Components/MovieRow";

import styles from "./Style";

import axios from "../../API/RoyalApi";
import endPoints from "../../API/EndPoints";
import RNFetchBlob from "rn-fetch-blob";
import VideoApi from "../../API/VideoApi";

const MovieDetail = ({ navigation, route }) => {
  //
  const [playerIdArray, setPlayerIdArray] = useState([]);
  const [seasons, setSeasons] = useState([]);
  // noinspection JSUnusedLocalSymbols
  const [suggested, setSuggested] = useState();
  const { Item, url, Type } = route.params;

  useEffect(() => {
    async function fetchs() {
      const request = await axios.get(url ? url : endPoints.drama, {
        headers: {
          Accept: "application/json",
          "User-Agent": "axios 0.21.1",
        },
      });

      if (Item.playerId !== undefined) {
        let Id = JSON.parse(Item.playerId);
        let Link = Item.playerLink.split(",");
        setPlayerIdArray(Id);

        for (let index = 0; index < Id.length; index++) {
          if (Id[index] === "" || Link[index] === "") {
          } else if (Id[index] !== "" && Link[index] !== "") {
            /* setPlayerId(Id[index]);
                      setPlayerLink(Link[index]); */
          }
        }
      }
      return request;
    }

    fetchs();

    async function mode() {
      if (Type) {
        try {
          const request = await axios.get(
            `${endPoints.seriesSeasonsRel}${Item.Imdbid} `,
            {
              headers: {
                Accept: "application/json",
                "User-Agent": "axios 0.21.1",
              },
            },
          );
          setSeasons(request.data.seasonsEpisodes.Seasons);
          return request;
        } catch (error) {
          console.warn("ERROR " + error.message);
        }
      }
    }

    mode();
    // noinspection JSIgnoredPromiseFromCall

    navigation.addListener("beforeRemove", () => {
    });
  }, [navigation, Item]);

  const final = {
    uri: `https://image.tmdb.org/t/p/original${Item.poster}`,
    priority: FastImage.priority.normal,
  };

  // Codigo do video Player
  const [videoUrl, setVideoUrl] = useState("");
  const [headers, setHeaders] = useState({});
  const [playerVisible, setPlayerVisible] = useState("none");

  const [isCasted, setCasted] = useState(false);
  const [videoLength, setVideoLength] = useState(-1);
  const [chromecastVisible, setChromecastVisible] = useState(false);

  /**
   *
   * @type {RemoteMediaClient}
   */
  const client = useRemoteMediaClient();

  GoogleCast.onCastStateChanged((state) => {
    // TODO: Remover debug
    ToastAndroid.show("Debug: " + state, ToastAndroid.SHORT);

    if (state === "notConnected") {
      setCasted(false);
    }
  });

  if (client) {
    if (!isCasted) {
      console.log("IsCasted: " + isCasted);
      console.log("videoUrl: " + videoUrl);
      console.log("videoUrl: " + JSON.stringify(videoUrl));
      console.log("videoUrl: " + (videoUrl !== null || videoUrl.length !== 0));
      if (Object.keys(headers).length > 0) {
        ToastAndroid.show("Não é possivel usar a função cast para essa fonte", ToastAndroid.LONG);
        GoogleCast.sessionManager.endCurrentSession(false);
        // setCasted(false);
      } else if (videoLength !== -1) {
        // Send the media to your Cast device as soon as we connect to a device
        // (though you'll probably want to call this later once user clicks on a video or something)
        // setCasted(true);
        client.loadMedia({
          mediaInfo: {
            contentUrl: videoUrl,
            contentType: "video/mp4",
            // contentId: Item.title || Item.name,
            streamDuration: videoLength,
            streamType: MediaStreamType.BUFFERED,
            /* contentUrl:
              'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4', */ //videoUrl
          },
        }).catch((reason) => {
          Share.share({
            message: JSON.stringify(reason),
          });
        });
      }
    }
  }

  // function cast(video) {
  //   GoogleCast.getCastState().then(res => console.log(res, 'res'));
  //   GoogleCast.castMedia(video);
  //   GoogleCast.showExpandedControls();
  // }
  return (
    <View style={styles.body}>
      <Header actualItem={Item} typeItem={Type} />
      <ScrollView style={styles.scrollBody}>
        <View style={styles.container}>
          <Animatable.View
            style={styles.posterContainer}
            animation="bounceIn"
            iterationCount={1}
          >
            <FastImage
              resizeMode="cover"
              source={final}
              style={styles.poster}
            />
          </Animatable.View>

          <View style={styles.details}>
            <Text style={styles.title}>{Item.title || Item.name}</Text>
            <Text style={styles.vote_average}> {Item.ratings}/10 </Text>
          </View>

          <View style={{ paddingHorizontal: 5, marginBottom: 15 }}>
            <Text style={styles.overviewTxt}>{Item.plot}</Text>
          </View>

          {Type ? (
            <View />
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                marginBottom: 80,
                maxHeight: 250,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: "20%",
                  padding: 3,
                  marginBottom: 4,
                }}
              >
                {playerIdArray.filter((a) => {
                  return a.player.name !== undefined;
                }).map((item, i) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      paddingHorizontal: 20,
                      paddingVertical: 4,
                      marginHorizontal: 8,
                      borderRadius: 4,
                      marginBottom: 4,
                    }}
                    key={i}
                    onPress={() => {
                      // setPlayerName(item.player.link);

                      (async () => {
                        let response = await VideoApi.loadVideo(
                          item.playerId, item.player.name
                        );

                        if (response.videoUrl != null) {
                          setHeaders(response.headers)
                          setVideoUrl(response.videoUrl)
                          setPlayerVisible("flex")
                        }else {
                          setHeaders({})
                          setVideoUrl(null)
                          setPlayerVisible("none")
                        }
                      })()
                    }}
                  >
                    <Text> {item.player.name} </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  maxHeight: 250,
                  marginBottom: 0,
                  display: playerVisible,
                }}
              >
                {videoUrl ? (
                  <WebView
                    source={{
                      uri: videoUrl,
                      headers: headers,
                    }}
                    allowsFullscreenVideo={true}
                    onMessage={(data) => {
                      console.log(data.nativeEvent.data);
                      setVideoLength(parseFloat(data.nativeEvent.data));
                      setChromecastVisible(true);
                    }}
                    onLoadStart={() => {
                      setChromecastVisible(false);
                    }}
                    injectedJavaScriptBeforeContentLoaded={`
                      let id = setInterval(() => {
                        let video = document.querySelector("video")
                        
                        if (!isNaN(video.duration)) {
                          window.ReactNativeWebView.postMessage(video.duration)
                          clearInterval(id)
                        }
                      }, 200)
                    `}
                    style={{ flex: 1, width: "100%", height: "100%" }}
                  />
                ) : (
                  <View />
                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                >

                  {/*{client && (*/}
                  {/*  <MenuProvider>*/}
                  {/*    <Menu*/}
                  {/*      options={[*/}
                  {/*        { text: 'Play Now', onPress: () => cast(video) },*/}
                  {/*        {*/}
                  {/*          text: 'Play Next',*/}
                  {/*          onPress: async () => {*/}
                  {/*            const status = await client.getMediaStatus()*/}
                  {/*            client*/}
                  {/*              .queueInsertItem(*/}
                  {/*                {*/}
                  {/*                  mediaInfo: video.toMediaInfo(),*/}
                  {/*                },*/}
                  {/*                status && status.queueItems.length > 2*/}
                  {/*                  ? status.queueItems[1].itemId*/}
                  {/*                  : undefined*/}
                  {/*              )*/}
                  {/*              .catch(console.warn)*/}
                  {/*          },*/}
                  {/*        },*/}
                  {/*        {*/}
                  {/*          text: 'Add to Queue',*/}
                  {/*          onPress: () =>*/}
                  {/*            client*/}
                  {/*              .queueInsertItem({*/}
                  {/*                mediaInfo: video.toMediaInfo(),*/}
                  {/*              })*/}
                  {/*              .catch(console.warn),*/}
                  {/*        },*/}
                  {/*        { text: 'Cancel', style: 'cancel' },*/}
                  {/*      ]}*/}
                  {/*    >*/}
                  {/*    </Menu>*/}
                  {/*  </MenuProvider>*/}
                  {/*)}*/}

                  {/*<Button title="Abrir o player" onPress={async () => {*/}
                  {/*  let items = (await GoogleCast.discoveryManager.getDevices());*/}

                  {/*  let text = "Items: " + items.length + "\n";*/}
                  {/*  items.forEach((item) => {*/}
                  {/*    text += "   " + item.name + "\n";*/}
                  {/*    text += "   " + item.deviceId + "\n";*/}
                  {/*  });*/}

                  {/*  text += "#######";*/}
                  {/*  ToastAndroid.show(text, ToastAndroid.SHORT);*/}
                  {/*}} />*/}

                  {chromecastVisible ? (
                    <CastButton
                      style={{ width: 24, height: 24, tintColor: "white" }}
                    />
                  ) : (<View></View>)}

                  <Text style={{ color: "white", marginLeft: 8 }}>
                    Cast do Filme{" "}
                  </Text>

                  <TouchableOpacity
                    style={{
                      marginLeft: 40,
                      // position: 'relative',
                    }}
                    onPress={() => {
                      const fileName = Item.title.replace(":", "") + ".";
                      const destPath =
                        RNFetchBlob.fs.dirs.DownloadDir + "/" + fileName;

                      PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                      ).then((granted) => {
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                          RNFetchBlob.config({
                            fileCache: true,
                            path: destPath,
                            addAndroidDownloads: {
                              path: destPath, // path needed duplicating here
                              useDownloadManager: true, // without this it works < android 10 , but crashes in android 10
                              notification: true,
                              title: Item.title,
                              mediaScannable: true,
                            },
                          }).fetch("GET", videoUrl, headers);
                        }
                      });

                      // RNFetchBlob.config(config).fetch()
                    }}
                  >
                    <Text style={{ color: "white", marginLeft: 8 }}>
                      {" "}
                      {"Download"}{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          <View style={styles.hr} />
          {Type ? (
            <View style={styles.seasonsBox}>
              <Text style={styles.seasonTxt}>Temporadas</Text>
              <ScrollView
                horizontal
                style={{
                  width: "100%",
                  height: 250,
                  marginTop: 2,
                }}
              >
                <View style={styles.seasonContainer}>
                  {seasons.length > 0 ? (
                    seasons.map((item) => {
                      return (
                        <Animatable.View
                          animation="bounceIn"
                          iterationCount={1}
                          key={item.id}
                          style={styles.seasonCard}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("Episodes", {
                                Data: item,
                              });
                            }}
                            style={styles.seasonBtn}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: "400",
                                color: "#fff",
                                marginBottom: 16,
                              }}
                            >
                              Temporada {item.season}{" "}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "400",
                                color: "#fff",
                              }}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        </Animatable.View>
                      );
                    })
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "400",
                        color: "#fff",
                      }}
                    >
                      Empty
                    </Text>
                  )}
                </View>
              </ScrollView>
            </View>
          ) : (
            <MovieRow
              requested={Type === true ? suggested : url}
              Genre={"Mais do género"}
              type={Type}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetail;
