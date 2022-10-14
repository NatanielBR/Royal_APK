import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import HeartIcon from '../Assets/Icons/outline-heart.png';
import StarIcon from '../Assets/Icons/outline-star.png';

import FastImage from 'react-native-fast-image';

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
}

function truncateYear(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + ' ' : str;
}

const MoviePoster = ({poster, movieName, likes, rate, year, bdS, type}) => {
  const [poster_path, setPoster_path] = useState('');

  useEffect(() => {
    const BG = {
      uri: `https://image.tmdb.org/t/p/original${poster}`,
      priority: FastImage.priority.normal,
    };
    setPoster_path(BG);
  }, [poster]);

  return (
    <View style={{...bdS, ...styles.img}}>
      <View style={styles.posterBtn}>
        <FastImage
          resizeMode={'cover'}
          source={poster_path}
          style={styles.posterStyle}
        />
      </View>
      <View
        style={{
          minHeight: 10,
          maxHeight: 20,
          width: '100%',
        }}>
        <Text style={styles.name}>{truncate(movieName, 16)}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.likeStats}>
          <Image source={HeartIcon} style={styles.icons} />
          <Text style={styles.statsText}>{likes}</Text>
        </View>
        <View style={styles.stats}>
          <Image source={StarIcon} style={styles.icons} />
          <Text style={styles.statsText}>{rate}</Text>
        </View>
        <View style={styles.year}>
          <Text style={styles.yearText}>{truncateYear(year, 5)}</Text>
        </View>
      </View>
    </View>
  );
};

export default MoviePoster;

const styles = StyleSheet.create({
  img: {
    height: 250,
    width: 150,
    paddingTop: 2,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    marginLeft: 3,
  },
  posterBtn: {
    alignSelf: 'center',
    width: '100%',
    height: '75%',
    borderRadius: 6,
  },
  posterStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    height: '10%',
    width: '100%',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 2,
    paddingHorizontal: 4,
  },
  likeStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 2,
    paddingHorizontal: 4,
  },
  year: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  statsText: {
    fontSize: 11,
    color: 'white',
  },
  yearText: {
    fontSize: 11.5,
    color: 'white',
  },
  icons: {
    width: 15,
    height: 15,
    tintColor: 'white',
    marginRight: 2,
  },
});
