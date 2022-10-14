import {StyleSheet} from 'react-native';
import Colors from '../../Assets/ColorPallet';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 16,
  },
  logo: {
    width: 80,
    height: 45,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  icon2: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
  closeModalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: Colors.whiteLow,
    height: 35,
    width: 35,
  },
  screensList: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  searchBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  searchBar: {
    width: '82%',
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#ffffff55',
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '18%',
    paddingVertical: 5,
  },
  screenName: {
    width: '80%',
  },
  txt: {
    fontWeight: '200',
    fontSize: 12,
    color: 'white',
  },
  animesRow: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    flex: 1,
    paddingTop: 32,
    paddingBottom: 48,
  },
});

export default styles;
