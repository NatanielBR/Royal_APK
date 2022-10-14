import {StyleSheet} from 'react-native';
import Colors from '../../Assets/ColorPallet';

const styles = StyleSheet.create({
  body: {
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
  screensList: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  closeModalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: Colors.whiteLow,
    height: 35,
    width: 35,
  },
  bigBtn: {
    width: '100%',
    flex: 1,
  },
  warnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300',
  },
});

export default styles;
