import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';

import GoogleCast, {
  CastButton,
  useRemoteMediaClient,
} from 'react-native-google-cast';

import Header from '../../Components/Header';
import MovieRow from '../../Components/MovieRow';

import styles from './Style';

import axios from '../../API/RoyalApi';
import endPoints from '../../API/EndPoints';

import BackIcon from '../../Assets/Icons/left-arrow.png';
import trailerIcon from '../../Assets/Icons/youtube.png';
import RNFetchBlob from 'rn-fetch-blob';

function DetailHead({ Back, Trailer }) {
  return (
    <View style={styles.header}>
      <StatusBar
        translucent={true}
        barStyle="light-content"
        backgroundColor={'transparent'}
      />
      <TouchableOpacity onPress={Back} style={{ width: 40, height: 20 }}>
        <Image
          source={BackIcon}
          style={{ width: '60%', height: '100%', tintColor: 'white' }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={Trailer} style={{ width: 40, height: 30 }}>
        <Image
          source={trailerIcon}
          style={{ width: '90%', height: '80%', tintColor: 'white' }}
        />
      </TouchableOpacity>
    </View>
  );
}

const MovieDetail = ({ navigation, route }) => {
  //
  const [playerIdArray, setPlayerIdArray] = useState([]);
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const [playerLink, setPlayerLink] = useState('');

  //
  const [seasons, setSeasons] = useState([]);

  //
  const [suggested, setSuggested] = useState();

  //YouTube Trailer play State
  const [playing, setPlaying] = useState(false);

  const { Item, ID, url, Type } = route.params;

  useEffect(() => {
    async function fetchs() {
      const request = await axios.get(url ? url : endPoints.drama, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'axios 0.21.1',
        },
      });
      let Id = JSON.parse(Item.playerId);
      let Link = Item.playerLink.split(',');
      setPlayerIdArray(Id);

      for (let index = 0; index < Id.length; index++) {
        if (Id[index] === '' || Link[index] === '') {
        } else if (Id[index] !== '' && Link[index] !== '') {
          /* setPlayerId(Id[index]);
                    setPlayerLink(Link[index]); */
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
                Accept: 'application/json',
                'User-Agent': 'axios 0.21.1',
              },
            },
          );
          setSeasons(request.data.seasonsEpisodes.Seasons);
          return request;
        } catch (error) {
          console.warn('ERROR ' + error.message);
        }
      }
    }

    mode();
    // noinspection JSIgnoredPromiseFromCall
    loadVideo();

    navigation.addListener('beforeRemove', data => {
    });
  }, [navigation, Item]);

  const BG = {
    uri: `https://image.tmdb.org/t/p/original${Item.poster}`,
    priority: FastImage.priority.normal,
  };

  const final = BG;

  /*
      https://suzihaza.com/v/p18p6smpzw7-67l
    */

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  // Codigo do video Player
  const [videoUrl, setVideoUrl] = useState('');
  const [headers, setHeaders] = useState({});
  const [playerVisible, setPlayerVisible] = useState('none');

  async function processFembed(url) {
    try {
      let urls = url.split('/');
      let id = urls[urls.length - 1];
      return await axios
        .post(`https://vanfem.com/api/source/${id}`, {})
        .then(res => {
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

  function cast(video) {
    GoogleCast.getCastState().then(res => console.log(res));
    GoogleCast.castMedia(video);
    GoogleCast.showExpandedControls();
  }

  function registerListeners() {
    const events =
      `SESSION_STARTING SESSION_STARTED SESSION_START_FAILED SESSION_SUSPENDED SESSION_RESUMING SESSION_ENDING SESSION_ENDED MEDIA_STATUS_UPDATED MEDIA_PLAYBACK_STARTED MEDIA_PLAYBACK_ENDED MEDIA_PROGRESS_UPDATED CHANNEL_CONNECTED CHANNEL_DISCONNECTED CHANNEL_MESSAGE_RECIEVED`
        .trim()
        .split(/\s+/);

    events.forEach(event =>
      GoogleCast.EventEmitter.addListener(GoogleCast[event]),
    );
  }

  useEffect(() => {
    loadVideo();
    //registerListeners();
    console.log(playerVisible);
  }, [playerId]);

  function MyComponent() {
    // This will automatically rerender when client is connected to a device
    // (after pressing the button that's rendered below)
    const client = useRemoteMediaClient();

    if (client) {
      // Send the media to your Cast device as soon as we connect to a device
      // (though you'll probably want to call this later once user clicks on a video or something)
      client.loadMedia({
        mediaInfo: {
          contentUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
          /* 
          contentUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4', */ //videoUrl
        },
      });
    }
  }

  return (
    <View style={styles.body}>
      <Header />
      <ScrollView style={styles.scrollBody}>
        <View style={styles.container}>
          <Animatable.View
            style={styles.posterContainer}
            animation="bounceIn"
            iterationCount={1}>
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
                width: '100%',
                height: '100%',
                marginBottom: 80,
                maxHeight: 250,
              }}>
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}>
                  <CastButton
                    style={{ width: 24, height: 24, tintColor: 'white' }}
                  />

                  <Text style={{ color: 'white', marginLeft: 8 }}>
                    Cast do Filme{' '}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: '25%',
                  padding: 3,
                  marginBottom: 4,
                  display: 'none',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 40,
                    paddingVertical: 4,
                    marginHorizontal: 8,
                    borderRadius: 4,
                    marginBottom: 4,
                  }}
                  onPress={() => {
                    const fileName = Item.title.replace(':', '') + '.mp4';
                    console.log('Clicando ' + fileName);
                    const destPath =
                      RNFetchBlob.fs.dirs.DownloadDir + '/' + fileName;

                    // const config = {
                    //     fileCache: true,
                    //     path: destPath,
                    //     addAndroidDownloads: {
                    //         title: destPath,
                    //         useDownloadManager: true, // without this it works < android 10 , but crashes in android 10
                    //         notification: true,
                    //         mime: mimeType,
                    //         mediaScannable: true,
                    //     }
                    // };

                    PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    ).then(granted => {
                      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        RNFetchBlob.config({
                          fileCache: true,
                          path: destPath,
                          addAndroidDownloads: {
                            path: destPath, // path needed duplicating here
                            useDownloadManager: true, // without this it works < android 10 , but crashes in android 10
                            notification: true,
                            title: 'Teste',
                            mediaScannable: true,
                          },
                        }).fetch('GET', videoUrl, headers);
                      }
                    });

                    // RNFetchBlob.config(config).fetch()
                  }}>
                  <Text> {'Download'} </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={styles.hr}></View>
          {Type ? (
            <View style={styles.seasonsBox}>
              <Text style={styles.seasonTxt}>Temporadas</Text>
              <ScrollView
                horizontal
                style={{
                  width: '100%',
                  height: 250,
                  marginTop: 2,
                }}>
                <View style={styles.seasonContainer}>
                  {seasons.length > 0 ? (
                    seasons.map(item => {
                      console.log(item);
                      return (
                        <Animatable.View
                          animation="bounceIn"
                          iterationCount={1}
                          key={item.id}
                          style={styles.seasonCard}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('Episodes', {
                                Data: item,
                              });
                            }}
                            style={styles.seasonBtn}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '400',
                                color: '#fff',
                                marginBottom: 16,
                              }}>
                              Temporada {item.season}{' '}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '400',
                                color: '#fff',
                              }}>
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
                        fontWeight: '400',
                        color: '#fff',
                      }}>
                      Empty
                    </Text>
                  )}
                </View>
              </ScrollView>
            </View>
          ) : (
            <MovieRow
              requested={Type === true ? suggested : url}
              Genre={'Mais do género'}
              type={Type}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetail;
