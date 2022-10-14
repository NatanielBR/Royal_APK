import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from './Style';

//COMPONENTS
import Header from '../../Components/Header';
import BottomTab from '../../Components/BottomTab';
import MoviePoster from '../../Components/MoviePoster';

//ICONS
import BackIcon from '../../Assets/Icons/left-arrow.png';

import axios from '../../Axios/TMDB';

const More = ({navigation, route}) => {
  const {fetch, Genre} = route.params;

  const [series, setSeries] = useState([]);

  useEffect(() => {
    async function fetchSeries() {
      const req = await axios.get(fetch);
      setSeries(req.data.results);
      return req;
    }
    fetchSeries();
  }, []);

  return (
    <View style={styles.body}>
      <Header />

      <View style={{flex: 1, width: '100%', paddingBottom: 16}}>
        <View style={styles.infoContainer}>
          <Image source={BackIcon} style={styles.icon} />
          <Text style={styles.genre}> {Genre} </Text>
        </View>
        <ScrollView>
          <View style={styles.seriesRow}>
            {series.map(serie => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MovieD', {itemId: serie.id});
                  }}
                  key={serie.id}>
                  <MoviePoster
                    key={serie.id}
                    poster={serie.poster_path}
                    movieName={serie.title || serie.name}
                    rate={serie.vote_average}
                    year={serie.release_date || serie.first_air_date}
                    likes={serie.vote_count}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default More;
