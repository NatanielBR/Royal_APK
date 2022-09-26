import {StyleSheet} from 'react-native';
import Colors from '../../Assets/ColorPallet';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: Colors.bGColor,
  },
  seriesRow: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 6,
    paddingBottom: 48,
  },
  infoContainer: {
    marginTop: 16,
    height: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
  },
  icon: {
    height: 20,
    width: 25,
    tintColor: 'white',
    alignSelf: 'baseline',
  },
  genre: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
});
export default styles;
