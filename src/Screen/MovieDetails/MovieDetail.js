import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {WebView} from 'react-native-webview';
//import movieTrailer from 'movie-trailer';
//import {moreContext} from '../../Context/ContextApi';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';

import Header from '../../Components/Header';
import MovieRow from '../../Components/MovieRow';

import styles from './Style';

import axios from '../../API/RoyalApi';
import endPoints from '../../API/EndPoints';

import BackIcon from '../../Assets/Icons/left-arrow.png';
import trailerIcon from '../../Assets/Icons/youtube.png';

function truncateYear(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + ' ' : str;
}

function DetailHead({Back, Trailer}) {
  return (
    <View style={styles.header}>
      <StatusBar
        translucent={true}
        barStyle="light-content"
        backgroundColor={'transparent'}
      />
      <TouchableOpacity onPress={Back} style={{width: 40, height: 20}}>
        <Image
          source={BackIcon}
          style={{width: '60%', height: '100%', tintColor: 'white'}}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={Trailer} style={{width: 40, height: 30}}>
        <Image
          source={trailerIcon}
          style={{width: '90%', height: '80%', tintColor: 'white'}}
        />
      </TouchableOpacity>
    </View>
  );
}

const MovieDetail = ({navigation, route}) => {
  //
  const [playerIdArray, setPlayerIdArray] = useState([]);
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const [playerLink, setPlayerLink] = useState('');

  //
  const [seasons, setSeasons] = useState([]);

  //
  const [playerOne, setPlayerOne] = useState(false);
  const [playerTwo, setPlayerTwo] = useState(false);
  const [playerThree, setPlayerThree] = useState(false);

  //
  const [item, setItems] = useState([]);
  const [suggested, setSuggested] = useState();

  //YouTube Trailer play State
  const [playing, setPlaying] = useState(false);

  //Trailer URL param
  const [trailerUrl, setTrailerUrl] = useState('');

  const {Item, ID, url, Type} = route.params;

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
          console.log('');
        } else if (Id[index] !== '' && Link[index] !== '') {
          /* setPlayerId(Id[index]);
          setPlayerLink(Link[index]); */
        }
      }
      return request;
    }

    /* 
       [
        { 
          "audio": "Dublado", 
          "player": {"link": "https://www.fembed.com/v/", "name": "Fembed.com"}, 
          "playerId": "/bat"
        }, 
        
        { 
          "audio": "Legendado", 
          "player": {"link": "https://www.fembed.com/v/", "name": "Fembed.com"}, 
          "playerId": "leg"
        }
      ]
    */

    fetchs();

    async function mode() {
      if (Type) {
        const request = await axios.get(
          `${endPoints.seriesSeasonsRel}${Item.Imdbid} `,
          {
            headers: {
              Accept: 'application/json',
              'User-Agent': 'axios 0.21.1',
            },
          },
        );
        console.log(request.data.seasonsEpisodes.Seasons);
        setSeasons(request.data.seasonsEpisodes.Seasons);
        return request;
      }
    }

    mode();
    // noinspection JSIgnoredPromiseFromCall
    loadVideo();
  }, [navigation, Item]);

  const BG = {
    uri: `https://image.tmdb.org/t/p/original${Item.poster}`,
    priority: FastImage.priority.normal,
  };

  const final = BG;

  //const {movies, Plus} = useContext(moreContext);
  /*
  const back = () => {
    navigation.goBack();
  };

  const trailer = () => {
    navigation.navigate('Trailer');
  };

  const likeItem = () => {
    setLike(!like);
  };

  const player = () => {
    navigation.navigate('VideoP');
  };

 */
  //get trailler url param

  /* https://www.fembed.com/v/2dl2zf26k-8wgqq */
  /*   const handleClick = movie => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || '')
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch(error => console.log(error));
    }
  };
  handleClick(item); */

  /* 
    https://suzihaza.com/v/p18p6smpzw7-67l
    https://fembed.cloud/e/${item.id}-dub 
  */

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      console.log('video has finished playing!');
    }
  }, []);

  // Codigo do video Player
  const [videoUrl, setVideoUrl] = useState('');
  const [headers, setHeaders] = useState({});

  async function loadVideo() {
    async function processFembed(url) {
      try {
        let urls = url.split('/');
        let id = urls[urls.length - 1];
        return await axios
          .post(`https://vanfem.com/api/source/${id}`, {})
          .then(res => {
            console.log(
              `Fembed Request of '${res.request.url}': ${res.status}`,
            );
            return res.data.data[0].file;
          });
      } catch (error) {
        console.error(error.message);
      }
    }

    async function processStreamSb(url) {
      let id = url.split('/');
      id = id[id.length - 1];
      let text = `||${id}||||streamsb`;

      return await axios
        .get(
          `https://viewsb.com/sources43/${text
            .split('')
            .reduce((hex, c) => (hex += c.charCodeAt(0).toString(16)), '')}/`,
        )
        .then(res => {
          console.log(res.data);
          return res.data.stream_data.file;
        });
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

      console.log(urlPart);
      console.log(urlPart2);

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

    let urlVideo = '';
    let urlStream = '';

    switch (playerName) {
      case 'Fembed':
        urlVideo = `https://suzihaza.com/v/${playerId}`;
        urlStream = await processFembed(urlVideo);

        ToastAndroid.show(urlVideo, ToastAndroid.LONG);

        console.log('URL-VIDEO: ' + urlVideo);
        console.log(`URL-STREAM: ${String.raw`${urlStream}`}`);
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

        console.log('URL-VIDEO: ' + urlVideo);
        console.log(`URL-STREAM: ${String.raw`${urlStream}`}`);
        setHeaders({
          Referer: urlVideo,
          //origin: playerLink,
        });
        setVideoUrl(urlStream);
        break;

      case 'Dood':
        urlVideo = `https://dood.to/e/${playerId}`;
        urlStream = await processDood(urlVideo);
        ToastAndroid.show(urlVideo, ToastAndroid.LONG);

        console.log('URL-VIDEO: ' + urlVideo);
        console.log(`URL-STREAM: ${String.raw`${urlStream}`}`);
        setHeaders({
          Referer: urlVideo,
        });
        setVideoUrl(urlStream);
        break;

      default:
        break;
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
    loadVideo();
    console.log(playerIdArray);
  }, [playerId]);

  return (
    <View style={styles.body}>
      <Header />
      <ScrollView style={styles.scrollBody}>
        <View style={styles.container}>
          {Type ? (
            <View />
          ) : (
            <View style={styles.videoPlayer}>
              {
                <WebView
                  style={{flex: 1, width: '100%'}}
                  source={{
                    headers: headers,
                    uri: videoUrl,
                  }}
                />
              }
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              padding: 3,
              marginBottom: 4,
            }}>
            {playerIdArray.map((item, i) => (
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 6,
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

          <View style={{paddingHorizontal: 5}}>
            <Text style={styles.overviewTxt}>{Item.plot}</Text>
          </View>
          <View style={styles.hr}></View>
          {Type ? (
            <View style={styles.seasonsBox}>
              <Text style={styles.seasonTxt}>Temporadas</Text>
              <ScrollView
                horizontal
                style={{width: '100%', height: 250, marginTop: 2}}>
                <View style={styles.seasonContainer}>
                  {seasons.length > 0 ? (
                    seasons.map(item => {
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
