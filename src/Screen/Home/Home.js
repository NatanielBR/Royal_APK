import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './Style';

import PlayIcon from '../../Assets/Icons/play.png';
import RandomIcon from '../../Assets/Icons/random.png';
import NewsIcon from '../../Assets/Icons/newspaper.png';
import LaptopIcon from '../../Assets/Icons/laptop.png';
import TvIcon from '../../Assets/Icons/tv-monitor.png';
import ListIcon from '../../Assets/Icons/list.png';

import Colors from '../../Assets/ColorPallet';
import BannerHeader from '../../Components/BannerHeader';
import BottomTab from '../../Components/BottomTab';
import Header from '../../Components/Header';
import axios from '../../API/RoyalApi';

import endPoints from '../../API/EndPoints';

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
}

function ScrollItems({Icon, Desc, Press}) {
  return (
    <TouchableOpacity onPress={Press} style={styles.scroolBtns}>
      <Image style={styles.scrollBtnIcons} source={Icon} />
      <Text style={styles.scrollBtnsText}>{Desc}</Text>
    </TouchableOpacity>
  );
}

export default function Home() {
  const navigation = useNavigation();

  const [banner, setBanner] = useState([]);
  const [random, setRandom] = useState([]);
  const [rand, setRand] = useState([]);
  const [stat, setStat] = useState([]);
  const [toggleRandom, setToggleRandom] = useState(false);

  useEffect(() => {
    async function fetchBannerInfo() {
      const request = await axios
        .get(`${endPoints.all}`, {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'axios 0.21.1',
          },
        })
        .catch(() => {
          console.log('ERR01');
          return 0;
        });

      setRand(
        request.data.results.rows[
          Math.floor(Math.random() * request.data.results.rows.length - 1)
        ],
      );
      setBanner(
        request.data.results.rows[
          Math.floor(Math.random() * request.data.results.rows.length - 1)
        ],
      );

      return request;
    }

    fetchBannerInfo();
  }, [navigation, toggleRandom]);

  const toMain = () => {
    navigation.navigate('Home');
  };
  const randomMovie = () => {
    navigation.navigate('MovieD', {Item: rand});
    setToggleRandom(!toggleRandom);
  };
  const m = () => {
    navigation.navigate('MoreOf', {itemId: 50, genre: 'Action'});
  };

  const final = {
    uri: `https://image.tmdb.org/t/p/original${banner?.poster}`,
  };

  return (
    <ImageBackground
      source={final}
      resizeMode="cover"
      width={500}
      style={style.body}>
      <BannerHeader MainPress={toMain} />

      <View style={styles.movieContainer}>
        <Text style={styles.movieStatus}>
          {stat.status == 'Released' ? 'Já disponível' : ''}
        </Text>
        <Text style={styles.movieName}>{truncate(banner?.title, 16)}</Text>
        <Text style={styles.movieRate}>{banner?.ratings}/10</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MovieD', {Item: banner});
          }}
          style={styles.watchBtn}>
          <Text style={{color: 'white'}}>Assistir</Text>
          <Image source={PlayIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <LinearGradient
        useAngle={true}
        angle={180}
        angleCenter={{x: 0.1, y: 0.7}}
        colors={['transparent', 'rgba(0, 0, 0, 2)']}
        style={styles.scrollBody}>
        <ScrollView horizontal>
          <ScrollItems Icon={NewsIcon} Desc={'Notícias do Royal'} />

          <ScrollItems
            Press={randomMovie}
            Icon={RandomIcon}
            Desc={'Filme aleatório'}
          />

          <ScrollItems Icon={LaptopIcon} Desc={'Assistir no computador'} />

          <ScrollItems Icon={TvIcon} Desc={'Assistir na TV'} />
          {/* 
          <ScrollItems Icon={ListIcon} Desc={'Adicionar a lista'} />
           */}
        </ScrollView>
      </LinearGradient>
      {/*  <BottomTab /> */}
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bGColor,
  },
});
