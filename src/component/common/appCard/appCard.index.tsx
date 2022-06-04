import React from 'react';
import {StyleSheet, View} from 'react-native';
import {hp} from '@/src/utils/screenRatio';
import {color, gradientColors, textColor} from '@/src/utils/color';
import LinearGradient from 'react-native-linear-gradient';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
interface AppCardProps {
  children?: any;
  width?: any;
  customGradientView?: any;
  customMainView?: any;
  requiredGradient?: boolean;
  borderRadius?: any;
}
const AppCard = (props: AppCardProps) => {
  const {
    children = null,
    width = '100%',
    customGradientView = null,
    customMainView = null,
    requiredGradient = true,
    borderRadius = hp(1.5),
  } = props;
  const styleSheet = StyleSheetSelection();
  return (
    <View style={styleSheet.shadow}>
      {requiredGradient ? (
        <LinearGradient
          colors={gradientColors.cardGradient}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}
          style={[styles.gradiant, {width, borderRadius}, customGradientView]}>
          <View style={[styles.mainView, customMainView]}>{children}</View>
        </LinearGradient>
      ) : (
        <View style={[styles.mainView, customMainView, {borderRadius}]}>
          {children}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  gradiant: {
    width: '100%',
    alignSelf: 'center',
    padding: hp(0.1),
    borderRadius: hp(1.5),
    borderColor: textColor.primary,
    elevation: 5,
    shadowColor: color.shadow_color,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  mainView: {
    // backgroundColor: '#ffffff',
    backgroundColor: color.light_background,
    width: '100%',
    padding: hp(2),
    borderRadius: hp(1.5),
    borderColor: textColor.primary,
    borderWidth: hp(0.1),
    elevation: 5,
    shadowColor: color.shadow_color,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
export default AppCard;
