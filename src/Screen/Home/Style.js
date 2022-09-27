import { StyleSheet } from 'react-native';
import Colors from '../../Assets/ColorPallet';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieContainer: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
  },
  movieName: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  movieStatus: {
    fontSize: 16,
    color: 'white',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  movieRate: {
    fontSize: 10,
    color: 'white',
  },
  watchBtn: {
    width: '60%',
    height: 50,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.whiteLow,
    marginTop: 16,
  },

  centerInfo: {
    marginBottom: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  buttonStyledInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textButtonInfos: {
    color: 'white',
    fontSize: 12
  },

  iconStyle: {
    color: 'white',
    width: 40,
    height: 40
  },
  // myList: {

  // }

  icon: {
    height: 20,
    width: 20,
    tintColor: 'white',
    marginLeft: 8,
  },
  scrollBody: {
    width: '100%',
    height: '30%',
    backgroundColor: 'transparent',
  },
  scroolBtns: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    paddingLeft: 8,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    margin: 12,
  },
  scrollBtnIcons: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
  scrollBtnsText: {
    fontSize: 10,
    color: 'white',
  },


});

export default styles;
