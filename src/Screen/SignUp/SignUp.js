import React from 'react';
import { View, Text } from 'react-native';
import styles from './Style';

import CustomInput from '../../Components/CustomInput';
import CustomBtn from '../../Components/CustomBtn';

import Eye from '../../Assets/Icons/eye.png';
import EyeOff from '../../Assets/Icons/eye-cross.png';
import Email from '../../Assets/Icons/email.png';
import User from '../../Assets/Icons/male-user.png';

const SignUp = ({ navigation }) => {
  const Main = () => {
    navigation.replace('Main');
  };

  return (
    <View style={styles.body}>
      <Text style={styles.Txt}>Cadastre-se</Text>

      <CustomInput
        btnActive={true}
        holder="Nome do Usuário"
        InputIcon2={User}
      />

      <CustomInput btnActive={true} holder="Email" InputIcon2={Email} />

      <CustomInput
        btnActive={false}
        holder="Senha"
        InputIcon1={Eye}
        InputIcon2={EyeOff}
      />

      <CustomInput
        btnActive={false}
        holder="Confirmar Senha"
        InputIcon1={Eye}
        InputIcon2={EyeOff}
      />

      <CustomBtn
        Press={Main}
        Text="Entrar"
        BtnBody={{ backgroundColor: 'grey', width: '71%', marginTop: 12 }}
        textStyle={{ color: 'white' }}
      />
    </View>
  );
};

export default SignUp;
