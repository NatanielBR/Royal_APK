import { StyleSheet } from 'react-native';
import Colors from '../../Assets/ColorPallet';
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.bGColor,
    justifyContent: 'center',
  },
  Txt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 32,
  },

  header: {
    height: 70,
    flexDirection: 'row',
    width: 400,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: Colors.bGColor,
  },

  btnBack: {
    width: 30,
    paddingLeft: 20,
    paddingTop: 5,
    marginRight: 30,
    height: 30,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 90,
    color: 'white',
  },
});

export default styles;
