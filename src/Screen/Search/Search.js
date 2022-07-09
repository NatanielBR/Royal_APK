import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
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
        navigation.navigate(goTo, {Item: data, url: endPoints.action});
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
  const {search, setSearch} = useContext(moreContext);

  const [toQuery, setToQuery] = useState(null);
  const [found, setFound] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await axios
      .get(`${endPoints.byTitle}${toQuery}`, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'axios 0.21.1',
        },
      })
      .then(e => {
        setFound(e.data.genre);
        setLoading(false);
      });
  };

  return (
    <Modal transparent visible={search} style={styles.modal}>
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
              setSearch(false);
            }}
            style={styles.closeModalBtn}>
            <Image source={CloseIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.screensList}>
          <View style={styles.searchBlock}>
            <TextInput
              placeholderTextColor={'#fff'}
              placeholder={'Digite o nome do seu filme ou série'}
              textAlign={'center'}
              style={styles.searchBar}
              onChangeText={e => {
                setToQuery(e);
              }}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
              <Image source={SearchIcon} style={styles.icon2} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{flex: 1, width: '100%'}}>
            <View style={styles.animesRow}>
              {isLoading ? (
                <ActivityIndicator size={30} color="#ffff" animating />
              ) : (
                found?.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        navigation.navigate('MovieD', {itemId: item.id});
                      }}>
                      <SearchedContent
                        key={item.imdbid}
                        posterImage={item.poster}
                        movieName={item.title}
                        rate={item.ratings}
                        year={item.year}
                        likes={item.votes}
                        data={item}
                        goTo={'MovieD'}
                      />
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </ScrollView>
        </View>
      </Animatable.View>
    </Modal>
  );
};

export default Menu;
