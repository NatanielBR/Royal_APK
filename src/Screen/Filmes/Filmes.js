import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import endPoints from '../../API/EndPoints';

import Header from '../../Components/Header';
import MovieRow from '../../Components/MovieRow';
import BottomTab from '../../Components/BottomTab';

import Colors from '../../Assets/ColorPallet';

const Filmes = () => {
  const fecthes = {
    action: `${endPoints.genre}ação`,
    adventure: `${endPoints.genre}aventura`,
    comedy: `${endPoints.genre}comédia`,
    terror: `${endPoints.genre}terror`,
    drama: `${endPoints.genre}drama`,
    documentaries: `${endPoints.genre}documentário`,
  };

  console.log(fecthes.action)

  return (
    <View style={styles.body}>
      <Header />

      <ScrollView style={styles.scrollBody}>
        <View style={styles.scrollContainer}>
          <MovieRow Genre={'Acção'} requested={fecthes.action} />
          <MovieRow Genre={'Aventura'} requested={fecthes.adventure} />
          <MovieRow Genre={'Comédia'} requested={fecthes.comedy} />
          <MovieRow Genre={'Drama'} requested={fecthes.drama} />
          <MovieRow Genre={'Terror'} requested={fecthes.terror} />
          <MovieRow Genre={'Documentário'} requested={fecthes.documentaries} />
        </View>
      </ScrollView>
      {/* <BottomTab /> */}
    </View>
  );
};

export default Filmes;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bGColor,
    paddingBottom: 24,
  },
  scrollBody: {
    flex: 1,
    width: '100%',
  },
});
