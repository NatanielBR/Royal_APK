import {StyleSheet} from 'react-native';

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
    alignSelf: 'flex-end',
    height: '50%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  bigBtn: {
    width: '100%',
    flex: 1,
  },
});

export default styles;
