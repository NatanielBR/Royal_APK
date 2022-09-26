import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import axios from '../../Axios/TMDB';

import TMDBrequests from '../../Axios/Requests';

import styles from './Style';
import Colors from '../../Assets/ColorPallet';

import CustomBtn from '../../Components/CustomBtn';
import Logo from '../../Components/Logo';

const Welcome = ({ navigation }) => {
  const [back, setBack] = useState([]);

  useEffect(() => {
    async function backDrop() {
      const request = await axios.get(TMDBrequests.fetchBackImg);
      setBack(request.data.results);
      // console.log(back);
      return request;
    }
    backDrop();
  }, []);

  const BG = { uri: `https://image.tmdb.org/t/p/original${back}` };

  const Login = () => {
    navigation.navigate('Login');
  };

  const SignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground source={BG} resizeMode="cover" style={styles.body}>
      <Logo />

      <Text style={styles.txt1}> Bem vindo ao Royal! </Text>
      <Text style={styles.txt2}> Assista seus filmes e séries favoritos </Text>

      <View style={styles.row}></View>

      <CustomBtn
        Text="Login"
        textStyle={{ color: 'white', fontWeight: 'bold' }}
        BtnBody={{ width: '50%', backgroundColor: Colors.lowOpacityGdr1 }}
        Press={Login}
      />

      <CustomBtn
        Text="Cadastre-se"
        textStyle={{ color: Colors.textColor, fontWeight: 'bold' }}
        BtnBody={{ width: '50%', borderWidth: 2, borderColor: Colors.textColor }}
        Press={SignUp}
      />
    </ImageBackground>
  );
};

export default Welcome;
