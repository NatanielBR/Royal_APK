import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import {moreContext} from '../Context/ContextApi';

import Menu from '../Screen/Menu/Menu';
import Notification from '../Screen/Notification/Not';

import Logo from '../Assets/Logo/Logo-Royal-Prime_TH1.png';
import MenuI from '../Assets/Icons/list.png';
import Bell from '../Assets/Icons/bell.png';

function HeadButtons(props) {
  return (
    <TouchableOpacity onPress={props.Press}>
      <Image style={{...styles.icons, ...props.style}} source={props.Icon} />
    </TouchableOpacity>
  );
}

const BannerHeader = props => {
  const [toggleModal, setToggleModal] = useState(false);
  const [notification, setNotification] = useState(false);
  const toggle = () => {
    setToggleModal(true);
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
        value={{toggleModal, setToggleModal, notification, setNotification}}>
        <TouchableOpacity onPress={toggle}>
          <Image style={styles.icons} source={MenuI} />
        </TouchableOpacity>

        <TouchableOpacity onPress={props.MainPress}>
          <Image
            style={(styles.icons, {width: 80, height: 50, alignSelf: 'center'})}
            source={Logo}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleNotification}>
          <Image style={styles.icons} source={Bell} />
        </TouchableOpacity>

        <Menu />
        <Notification />
      </moreContext.Provider>
    </View>
  );
};

export default BannerHeader;

const styles = StyleSheet.create({
  body: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  headerBtns: {
    height: '100%',
    width: '24%',
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icons: {
    width: 18,
    height: 18,
    tintColor: 'white',
  },
});
