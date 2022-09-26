import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import styles from './Style';
import CustomInput from '../../Components/CustomInput';
import CustomBtn from '../../Components/CustomBtn';
import Colors from '../../Assets/ColorPallet';

import Logo from '../../Components/Logo';

import Email from '../../Assets/Icons/email.png';
import EyeOff from '../../Assets/Icons/eye-cross.png';
import Eye from '../../Assets/Icons/eye.png';

const Login = ({ navigation }) => {
  const Main = () => {
    navigation.replace('Main');
  };

  return (
    <KeyboardAvoidingView enabled behavior={'height'} style={styles.body}>
      <Logo />

      <CustomInput holder={'Email'} InputIcon2={Email} btnActive={true} />
      <CustomInput holder={'Senha'} InputIcon1={Eye} InputIcon2={EyeOff} />

      <View style={styles.container}>
        <View style={styles.myAcessBody}>
          <TouchableOpacity style={styles.myAcessBtn}></TouchableOpacity>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>
            Lembrar Meu Acesso
          </Text>
        </View>

        <CustomBtn
          Text="Entrar"
          textStyle={{ color: 'white', fontWeight: '500' }}
          Press={Main}
          BtnBody={{ backgroundColor: Colors.textColor, width: '100%' }}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
