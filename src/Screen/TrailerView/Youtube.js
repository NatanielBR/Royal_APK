import React, {useState, useCallback, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const screen = Dimensions.get('screen');

const Youtube = () => {
  const [playing, setPlaying] = useState(false);

  const isLandscape = screen.width > screen.height;

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      console.log('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View style={isLandscape}>
      <YoutubePlayer
        height={400}
        play={playing}
        videoId={'iee2TATGMyI'}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default Youtube;

const styles = StyleSheet.create({});

/**
 * 
  useEffect(() => {
    const onChange = result => {
      setOrientation(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.addEventListener('remove', onChange);
    };

    return {
      ...orientation,
      isPortrait: orientation.height > orientation.width,
    };
  }, []);

 */
