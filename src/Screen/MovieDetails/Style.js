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
    minHeight: 1024,
    maxHeight: 1200,
    alignItems: 'center',
    width: '100%',
  },
  playerOptionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 24,
    marginBottom: 32,
    width: '80%',
  },
  playerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 5.5,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'white',
  },
  playerTxt: {
    color: 'white',
    fontSize: 14,
    fontWeight: '300',
  },
  videoPlayer: {
    width: '100%',
    height: '25%',
    maxHeight: 250,
    backgroundColor: 'gray',
    marginBottom: 24,
  },
  posterContainer: {
    width: '57%',
    minHeight: '28%',
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
  overviewTxt: {
    color: 'white',
    textAlign: 'justify',
    fontSize: 12,
    fontWeight: '300',
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
  vote_average: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10.5,
    fontWeight: '300',
  },
  seasonsBox: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  seasonTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    marginLeft: 8,
  },
  seasonContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seasonCard: {
    width: 150,
    height: 180,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  seasonBtn: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
