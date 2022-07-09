import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../Assets/ColorPallet';

import FilmeIcon from '../Assets/Icons/play.png';
import AnimeIcon from '../Assets/Icons/anime-berserk.png';
import SerieIcon from '../Assets/Icons/film-reel.png';
import DownloadIcon from '../Assets/Icons/cloud-download.png';

function tabs(props) {
  return (
    <TouchableOpacity style={styles.tab}>
      <Image source={FilmeIcon} style={focus ? styles.Icon : focused} />
      <Text style={focus ? styles.tabText : textFocused}> Filme </Text>
    </TouchableOpacity>
  );
}

const BottomTab = ({active}) => {
  const [filmes, setFilmes] = useState(false);
  const [series, setSeries] = useState(false);
  const [animes, setAnimes] = useState(false);
  const [downloads, setDownloads] = useState(false);

  const navigation = useNavigation();

  const moviesS = () => {
    setFilmes(true);
    setSeries(false);
    setAnimes(false);
    setDownloads(false);
    navigation.replace('Filmes');
  };

  const seriesS = () => {
    setFilmes(false);
    setSeries(true);
    setAnimes(false);
    setDownloads(false);
    navigation.replace('Series');
  };

  const animesS = () => {
    setFilmes(false);
    setSeries(false);
    setAnimes(true);
    setDownloads(false);
    navigation.replace('Animes');
  };
  const downloadS = () => {
    setFilmes(false);
    setSeries(false);
    setAnimes(false);
    setDownloads(true);
    navigation.replace('Download');
  };

  const focused = {
    tintColor: Colors.tabInactive,
    width: 25,
    height: 25,
  };

  const textFocused = {
    fontSize: 12,
    color: Colors.tabActive,
    tintColor: Colors.tabActive,
  };

  return (
    <View style={styles.body}>
      <TouchableOpacity onPress={moviesS} style={styles.tab}>
        <Image source={FilmeIcon} style={filmes ? focused : styles.Icon} />
        <Text style={filmes ? textFocused : styles.tabText}> Filmes </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={seriesS} style={styles.tab}>
        <Image source={SerieIcon} style={series ? focused : styles.Icon} />
        <Text style={series ? textFocused : styles.tabText}> Séries </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={animesS} style={styles.tab}>
        <Image source={AnimeIcon} style={animes ? focused : styles.Icon} />
        <Text style={animes ? textFocused : styles.tabText}> Animes </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={downloadS} style={styles.tab}>
        <Image
          source={DownloadIcon}
          style={downloads ? focused : styles.Icon}
        />
        <Text style={downloads ? textFocused : styles.tabText}>Downloads</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.tabColor,
    width: '100%',
    height: 60,
  },
  tab: {
    flex: 1,
    height: '55%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabText: {
    fontSize: 9,
    color: 'gray',
  },
  Icon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});
