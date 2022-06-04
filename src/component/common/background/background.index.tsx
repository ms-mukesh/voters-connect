import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {color} from '@/src/utils/color';

const Background = (props: any) => {
  return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.app_background_color,
    height: '100%',
    width: '100%',
  },
});

export default Background;
