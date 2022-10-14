import {StyleSheet} from 'react-native';
import Colors from '../../Assets/ColorPallet';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.bGColor,
  },
  scrollBody: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    maxHeight: 1000,
    alignItems: 'center',
    width: '100%',
  },
  videoPlayer: {
    width: '100%',
    height: '40%',
    maxHeight: 240,
    backgroundColor: 'gray',
    marginBottom: 24,
  },
  posterContainer: {
    width: '52%',
    minHeight: '32%',
    maxHeight: 200,
    backgroundColor: Colors.whiteLow,
    padding: 3,
    borderRadius: 6,
  },
  posterEpisodeContainer: {
    width: '100%',
    minHeight: '35%',
    maxHeight: 200,
    backgroundColor: Colors.whiteLow,
    padding: 3,
    borderRadius: 6,
  },
  poster: {
    height: '100%',
    width: '100%',
    borderRadius: 6,
  },

  details: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: '300',
  },
  clicked: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 5.5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: Colors.whiteLow,
  },
  clickedTxt: {
    color: Colors.primaryColor,
  },
  hr: {
    height: 0.3,
    width: '98%',
    backgroundColor: 'white',
    marginVertical: 12,
  },
  episodesContainer: {
    width: '100%',
    height: 234,
    paddingHorizontal: 10,
    marginTop: 16,
  },
  episodeCard: {
    width: 160,
    height: 230,
    borderRadius: 4,
    marginTop: 16,
    marginHorizontal: 8,
  },
  warnTxt: {
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 10,
  },
  warnTxt1: {
    marginLeft: 6,
    color: '#fff',
    marginTop: 16,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  txt1: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
  },
});

export default styles;
