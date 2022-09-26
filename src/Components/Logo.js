import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

import Logo from '../Assets/Logo/Logo-Royal-Prime_T1.png';

const MainLogo = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.Logo} />
    </View>
  );
};

export default MainLogo;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },
  Logo: {
    height: '80%',
    width: '50%',
    tintColor: 'white',
  },
});
