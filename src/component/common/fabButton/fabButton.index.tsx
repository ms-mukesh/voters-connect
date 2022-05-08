import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {color, textColor} from '@/src/utils/color';
import {hp, wp, normalize} from '@/src/utils/screenRatio';
import {SvgImage} from '@/src/component/common';
import {ADD_WHITE} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';

const FabButton = (props: any) => {
  const {onPress = null, display = true} = props;
  return display ? (
    <Pressable
      onPress={onPress}
      style={[styles.FABIcon, props?.customStyle ?? null]}>
      <SvgImage height={hp(7)} width={wp(6)} Source={props?.text ?? ADD_WHITE} />
    </Pressable>
  ) : null;
};

const styles = StyleSheet.create({
  FABIcon: {
    height: hp(8),
    width: hp(8),
    borderRadius: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: hp(3),
    right: wp(5),
    backgroundColor: textColor.primary,
    textAlign: 'center',
    elevation: 5,
    shadowColor: color.shadow_color,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  FABIconText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(10),
  },
});
export default FabButton;
