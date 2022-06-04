import React from 'react';

import {Pressable, StyleSheet} from 'react-native';

import {WHATSUP_WHITE} from '@/src/assets/images/svgIcons/accountSvgIcon/accountSvg.index';
import {color} from '@/src/utils/color';
import {SvgImage} from '@/src/component/common';
import {hp, wp} from '@/src/utils/screenRatio';

const AppIconButton = (props: any) => {
  const {
    icon = WHATSUP_WHITE,
    containerStyle = null,
    iconCustomStyle = null,
    disabled = false,
  } = props;

  return (
    <Pressable
      disabled={disabled}
      activeOpacity={0.5}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? color.disableButton : color.enableButton,
        },
        containerStyle,
      ]}
      {...props}>
      <SvgImage
        height={hp(6)}
        width={wp(6)}
        style={[styles.buttonIcon, iconCustomStyle]}
        Source={icon}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: hp(3.5),
    backgroundColor: color.enableButton,
    justifyContent: 'center',
    height: hp(7),
    width: hp(7),
    alignSelf: 'center',
    elevation: 5,
    shadowColor: color.shadow_color,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  centerItems: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {},
});
export default AppIconButton;
