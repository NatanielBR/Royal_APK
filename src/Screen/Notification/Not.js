import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {BlurView} from '@react-native-community/blur';

import styles from './Style';
import {moreContext} from '../../Context/ContextApi';

import Logo from '../../Assets/Logo/Logo-Royal-Prime_TH1.png';
import CloseIcon from '../../Assets/Icons/close-cross.png';
import SearchIcon from '../../Assets/Icons/search.png';

import MoviePoster from '../../Components/MoviePoster';

import axios from '../../API/RoyalApi';
import endPoints from '../../API/EndPoints';

function SearchedContent({
  posterImage,
  data,
  year,
  likes,
  rate,
  movieName,
  goTo,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(goTo, {Item: data});
      }}>
      <MoviePoster
        movieName={movieName}
        year={year}
        likes={likes}
        poster={posterImage}
        rate={rate}
      />
    </TouchableOpacity>
  );
}

const Menu = () => {
  const {notification, setNotification} = useContext(moreContext);

  const [toQuery, setToQuery] = useState(null);
  const [found, setFound] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleSearch = async () => {
    const res = await axios
      .get(`${endPoints.find}${toQuery}`, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'axios 0.21.1',
        },
      })
      .then(e => {
        setFound(e.data.genre);
      });
  };

  return (
    <Modal transparent visible={notification} style={styles.modal}>
      <BlurView
        style={styles.blur}
        blurType="dark"
        blurAmount={1}
        reducedTransparencyFallbackColor="white"
      />
      <Animatable.View
        style={styles.container}
        animation="slideInDown"
        iterationCount={1}>
        <View style={styles.header}>
          <View>
            <Image style={styles.logo} source={Logo} />
          </View>
          <TouchableOpacity
            onPress={() => {
              setNotification(false);
            }}
            style={styles.closeModalBtn}>
            <Image source={CloseIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.screensList}>
          <View style={styles.searchBlock}>
            <Text style={styles.warnText}>Sem Notificações</Text>
          </View>
        </View>
      </Animatable.View>
    </Modal>
  );
};

export default Menu;
