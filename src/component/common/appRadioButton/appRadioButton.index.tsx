import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {CustomText, RadioButtonCircle} from '@/src/component/common';
import {hp, wp} from '@/src/utils/screenRatio';
import {textColor} from '@/src/utils/color';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
interface AppRadioButtonType {
  isSelected?: boolean;
  onPress?: any;
  title?: string;
}
const AppRadioButton = (props: AppRadioButtonType) => {
  const {isSelected = false, onPress = null, title = ''} = props;
  const styleSheet = StyleSheetSelection();
  return (
    <Pressable onPress={onPress} style={styles.mainView}>
      <RadioButtonCircle isSelected={isSelected} />
      <CustomText style={[styleSheet.mediumLargeRegular, styles.titleText]}>
        {title}
      </CustomText>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  mainView: {
    padding: hp(1),
    borderRadius: hp(5),
    borderWidth: hp(0.1),
    borderColor: textColor.primaryGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    marginHorizontal: wp(2),
    color: textColor.primaryGray,
    marginTop: hp(0.2),
  },
});
export default AppRadioButton;
