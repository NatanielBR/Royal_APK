import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from '../../Components/Header';
import Colors from '../../Assets/ColorPallet';
import BottomTab from '../../Components/BottomTab';

import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/get-coming-soon-movies',
  params: {},
  headers: {
    'x-rapidapi-host': 'imdb8.p.rapidapi.com',
    'x-rapidapi-key': '8ccd169ef6mshf525d64ba74e796p1f7d29jsnd468f6428a92',
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

const Downloads = () => {
  return (
    <View style={styles.body}>
      <Header />
    </View>
  );
};

export default Downloads;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.bGColor,
  },
});
