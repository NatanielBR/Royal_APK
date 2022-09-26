import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
//const {Height, Width} = Dimensions.get('screen');

const Video = ({route}) => {
  //http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
  /**
   * 
import VideoPlayer from 'react-native-video-player';

   * <VideoPlayer
          video={{
            uri: 'https://3gd64u.cfeucdn.com/silverlight/secip/108215/0/Gcq08r2FDywp8jDJTxw1og/NDEuNzIuMTcuMTk=/1642012334/hls-vod-s006/flv/api/files/videos/2022/01/12/1641952070fzhii',
          }}
          videoWidth={1600}
          videoHeight={900}
          thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
        />
   */
  //https://fembed.cloud/e/524434-dub

  const {data} = route.params;
  console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.video}>
        <WebView
          style={{flex: 1, width: '100%'}}
          source={{uri: 'https://fembed.cloud/e/524434-dub'}}
        />
      </View>
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: '50%',
    backgroundColor: 'gray',
  },
});
