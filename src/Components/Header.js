import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {moreContext} from '../Context/ContextApi';

import Color from '../Assets/ColorPallet';
import Search from '../Assets/Icons/search.png';
import Equalizer from '../Assets/Icons/equalizer.png';
import Logo from '../Assets/Logo/Logo-Royal-Prime_TH1.png';
import MenuIcon from '../Assets/Icons/list.png';
import Bell from '../Assets/Icons/bell.png';
import Menu from '../Screen/Menu/Menu';
import Filter from '../Screen/Filter/Filter';
import SearchScreen from '../Screen/Search/Search';
import Notification from '../Screen/Notification/Not';

function HeadButtons(props) {
  const navigation = useNavigation();
  const goHome = () => {
    navigation.navigate('Home');
  };
  return (
    <TouchableOpacity style={styles.btnBody} onPress={props.M || goHome}>
      <Image style={{...styles.icons, ...props.style}} source={props.Icon} />
    </TouchableOpacity>
  );
}

const Header = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState(false);
  const [notification, setNotification] = useState(false);

  const toggle = () => {
    setToggleModal(true);
  };

  const toggleFil = () => {
    setFilter(true);
  };

  const toggleSearch = () => {
    setSearch(true);
  };

  const toggleNotification = () => {
    setNotification(true);
  };

  return (
    <View style={styles.body}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={'transparent'}
      />
      <moreContext.Provider
        value={{
          toggleModal,
          setToggleModal,
          filter,
          setFilter,
          search,
          setSearch,
          notification,
          setNotification,
        }}>
        <HeadButtons
          modal={true}
          M={toggle}
          Icon={MenuIcon}
          style={{marginLeft: 12}}
        />

        <HeadButtons
          Icon={Logo}
          style={{
            width: 80,
            height: 50,
            alignSelf: 'center',
            marginLeft: 12,
          }}
        />

        <View style={styles.headerBtns}>
          <HeadButtons M={toggleSearch} Icon={Search} />
          <HeadButtons M={toggleNotification} Icon={Bell} />
        </View>
        <Menu />
        <Filter />
        <SearchScreen />
        <Notification />
      </moreContext.Provider>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: 80,
    backgroundColor: Color.bGColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerBtns: {
    height: '100%',
    width: '24%',
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnBody: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 18,
    height: 18,
    tintColor: 'white',
  },
});
