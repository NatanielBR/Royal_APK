import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../Assets/ColorPallet';

import Header from '../../Components/Header';
import BottomTab from '../../Components/BottomTab';

import MoviePoster from '../../Components/MoviePoster';

import axios from '../../API/RoyalApi';
import endPoints from '../../API/EndPoints';

const Series = ({ navigation }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    async function fetch() {
      const req = await axios.get(`${endPoints.allSeries}`);
      setSeries(req.data.results.rows);
      return req;
    }

    fetch();
  }, []);

  return (
    <View style={styles.body}>
      <Header />

      <View style={{ flex: 1, width: '100%', paddingBottom: 16 }}>
        <ScrollView style={{ width: '100%', flex: 1 }}>
          <View style={styles.seriesRow}>
            {series.map(serie => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MovieD', {
                      Item: serie,
                      Type: true,
                    });
                  }}
                  key={serie.id}>
                  <MoviePoster
                    key={serie.id}
                    poster={serie.poster}
                    movieName={serie.title || serie.name}
                    rate={serie.ratings}
                    year={serie.year}
                    likes={serie.votes}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {/* <BottomTab /> */}
    </View>
  );
};

export default Series;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: Colors.bGColor,
  },
  seriesRow: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
    paddingBottom: 48,
  },
});
