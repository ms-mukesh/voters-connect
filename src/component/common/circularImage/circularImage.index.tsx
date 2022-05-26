import React from 'react';
import {FastImage} from '@/src/component/common';
import {StyleSheet} from 'react-native';
import {hp} from '@/src/utils/screenRatio';
interface CircularImageType {
  url?: string;
  customStyle?: any;
}
const CircularImage = (props: CircularImageType) => {
  const {url = '', customStyle = null} = props;
  return <FastImage uri={url} containerStyle={[styles.image, customStyle]} />;
};
const styles = StyleSheet.create({
  image: {
    height: hp(15),
    width: hp(15),
    borderRadius: hp(7.5),
  },
});
export default CircularImage;
