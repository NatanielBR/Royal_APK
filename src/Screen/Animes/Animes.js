import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../Assets/ColorPallet';

import Header from '../../Components/Header';
import MoviePoster from '../../Components/MoviePoster';
import BottomTab from '../../Components/BottomTab';

import axios from '../../API/RoyalApi';
import endPoints from '../../API/EndPoints';

import requests from '../../Axios/Requests';

const Animes = ({navigation}) => {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    async function fetch() {
      const req = await axios.get(`${endPoints.genre}Anime`, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'axios 0.21.1',
        },
      });
      setAnime(req.data.movies.rows);
      return req;
    }
    fetch();
  }, [navigation]);

  return (
    <View style={styles.body}>
      <Header />
      {/* <BottomTab /> */}
      <View style={{flex: 1, width: '100%'}}>
        <ScrollView>
          <View style={styles.animesRow}>
            {anime?.map(animes => {
              return (
                <TouchableOpacity
                  key={animes.id}
                  onPress={() => {
                    navigation.navigate('MovieD', {itemId: animes.id});
                  }}>
                  <MoviePoster
                    key={animes.imdbid}
                    poster={animes.posterImage}
                    movieName={animes.title}
                    rate={animes.ratings}
                    year={animes.year}
                    likes={animes.votes}
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

export default Animes;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: Colors.bGColor,
  },
  animesRow: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
    paddingBottom: 48,
  },
});
