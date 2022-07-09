import React, {useEffect, useState, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//import {moreContext} from '../Context/ContextApi';

//import axios from '../Axios/TMDB';
import axios from '../API/RoyalApi';
import MoviePoster from './MoviePoster';
import MoreButton from './MoreButton';

const MovieRow = ({Genre, requested, type}) => {
  const navigation = useNavigation();

  const [searchMovie, setSearchMovie] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetch() {
      const request = await axios
        .get(requested, {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'axios 0.21.1',
          },
        })
        .then(res => {
          setMovies(type ? res.data.seasonsEpisodes : res.data.movies.rows);
        })
        .catch(res => {
          return 0;
        });

      return request;
    }
    fetch();
  }, []);

  var n = 1;

  return (
    <View style={styles.rowBody}>
      <Text
        style={{
          marginLeft: 16,
          fontSize: 17,
          fontStyle: 'italic',
          fontWeight: '500',
          color: 'white',
        }}>
        {Genre}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode="never">
        <View style={{flexDirection: 'row'}}>
          {movies?.map((movie, index) => {
            if (n <= 10) {
              n++;

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate('MovieD', {
                      Item: movie,
                      ID: movie.Imdbid,
                      url: requested,
                    });
                  }}>
                  <MoviePoster
                    bdS={{margin: 16}}
                    key={movie.Imdbid}
                    poster={movie.poster}
                    movieName={movie.title}
                    rate={movie.ratings}
                    year={movie.year}
                    likes={movie.votes}
                  />
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieRow;

const styles = StyleSheet.create({
  rowBody: {
    padding: 4,
    marginTop: 8,
  },
});
