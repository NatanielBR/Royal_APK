import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

import Colors from '../Assets/ColorPallet';
import PlusIcon from '../Assets/Icons/plus.png';

const MoreButton = () => {
  return (
    <View style={styles.container}>
      <Image source={PlusIcon} style={styles.icon} />
    </View>
  );
};

export default MoreButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 185,
    width: 150,
    marginTop: 18,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: 'white',
    backgroundColor: Colors.whiteLow,
    marginRight: 8,
  },
  icon: {
    height: 50,
    width: 50,
    tintColor: 'white',
  },
});
