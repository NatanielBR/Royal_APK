import {StyleSheet} from 'react-native';
import Colors from '../../Assets/ColorPallet';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  myAcessBody: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  myAcessBtn: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 2,
    marginRight: 8,
  },
  container: {
    paddingTop: 16,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '23%',
  },
});

export default styles;
