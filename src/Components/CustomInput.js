import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const CustomInput = props => {
  const [eyePassword, setEyePassword] = useState(true);

  const togglePassword = () => {
    setEyePassword(!eyePassword);
  };
  return (
    <View style={styles.inputBody}>
      <TextInput
        secureTextEntry={eyePassword}
        placeholder={props.holder}
        style={styles.input}
      />
      <TouchableOpacity
        disabled={props.btnActive}
        onPress={togglePassword}
        style={styles.iconContainer}>
        <Image
          source={eyePassword ? props.InputIcon2 : props.InputIcon1}
          style={styles.Icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBody: {
    flexDirection: 'row',
    height: 45,
    marginBottom: 12,
  },
  input: {
    width: '60%',
    height: 45,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  Icon: {
    width: '50%',
    height: '50%',
    tintColor: 'grey',
  },
  iconContainer: {
    paddingRight: 1,
    width: '12%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
});
export default CustomInput;
