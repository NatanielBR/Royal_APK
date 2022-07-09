import {
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Styles';
import axios from '../../API/RoyalApi';

import Header from '../../Components/Header';
import EndPoints from '../../API/EndPoints';

import {WebView} from 'react-native-webview';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';

const Episodes = ({navigation, route}) => {
  const {Data, Update} = route.params;

  const [episodes, setEpisodes] = useState([]);
  const [episodePoster, setEpisodePoster] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerLink, setPlayerLink] = useState('');

  useEffect(() => {
    async function fetchs() {
      const request = await axios
        .get(`${EndPoints.seriesRel}${Data.seriesImdbid}&${Data.season}`, {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'axios 0.21.1',
          },
        })
        .then(e => setEpisodes(e.data.seasonsEpisodes.Episodes));
      let Id = request.Episodes[0].playerId.split(',');
      let Link = request.Episodes[0].playerLink.split(',');

      setPlayerId(Id[0]);
      setPlayerLink(Link[0]);
      setEpisodePoster(request.Episodes[0].poster);
      console.log(request.Episodes);
      console.log(episodePoster);
      console.log(Id);
      console.log(Link);
      return request;
    }

    fetchs();
  }, []);

  useEffect(() => {
    console.log('Mudou para');
    console.log(playerId);
  }, [playerId]);

  const BG = {
    uri: `https://image.tmdb.org/t/p/original${episodePoster}`,
    priority: FastImage.priority.normal,
  };

  const final = BG;

  return (
    <View style={styles.body}>
      <Header />
      <ScrollView style={styles.scrollBody}>
        <View style={styles.container}>
          <View style={styles.videoPlayer}>
            <WebView
              style={{flex: 1, width: '100%'}}
              source={{
                uri: `${playerLink}${playerId}`,
              }}
            />
          </View>
          <View style={styles.posterContainer}>
            <FastImage
              resizeMode="cover"
              source={final}
              style={styles.poster}
            />
          </View>

          <View style={styles.warnTxt}>
            <Text style={styles.warnTxt1}>
              Episódios da {Data.season}ª Temporada{' '}
            </Text>
          </View>

          <ScrollView
            horizontal
            style={{
              width: '100%',
            }}>
            <View style={styles.episodesContainer}>
              {episodes?.map(item => {
                console.log(item);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      let Id = item.playerId.split(',');
                      let Link = item.playerLink.split(',');
                      setPlayerId(Id[0]);
                      setPlayerLink(Link[0]);
                    }}
                    key={item.id}
                    style={styles.episodeCard}>
                    <View style={styles.posterEpisodeContainer}>
                      <FastImage
                        resizeMode="cover"
                        source={final}
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
