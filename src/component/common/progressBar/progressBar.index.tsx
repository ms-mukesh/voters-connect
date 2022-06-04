import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {textColor} from '@/src/utils/color';
import {hp, wp} from '@/src/utils/screenRatio';
import {CustomText} from '@/src/component/common';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
interface ProgressBarType {
  percentage?: number;
  total?: number;
  completed?: number;
  rightText?: string;
  countPercentage?: boolean;
  barColor?: string;
}
const ProgressBar = (props: ProgressBarType) => {
  const {
    percentage = 10,
    total = 2,
    completed = 1,
    rightText = '',
    countPercentage = false,
    barColor = textColor.primary,
  } = props;
  const width = percentage > 100 ? '100%' : percentage + '%';
  const [countedWidth, setCountedWidth] = useState('0%');
  useEffect(() => {
    const tempPercentage = (completed * 100) / total;
    setCountedWidth(tempPercentage + '%');
  }, [countPercentage]);

  const styleSheet = StyleSheetSelection();
  return (
    <View>
      <View style={styles.titleView}>
        <View style={styles.topSubView}>
          <CustomText style={[styleSheet.regularBold, styles.titleValue]}>
            {completed}
            <CustomText
              style={[styleSheet.regular, styles.titleValueTotalCount]}>
              {' Of ' + total}
            </CustomText>
          </CustomText>
        </View>
        <View style={[styles.skipButtonView]}>
          <CustomText
            style={[styleSheet.regularBold, styleSheet.secondaryTextColor]}>
            {rightText}
          </CustomText>
        </View>
      </View>
      <View style={styleSheet.dividerView} />
      <View style={styles.mainView}>
        <View
          style={[
            styles.filledBar,
            {
              width: countPercentage ? countedWidth : width,
              backgroundColor: barColor,
            },
          ]}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainView: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: textColor.lightestGray,
    height: hp(0.5),
    borderRadius: hp(2),
    flexDirection: 'row',
  },
  filledBar: {
    height: hp(0.5),
    backgroundColor: textColor.primary,
    borderRadius: hp(2),
  },
  titleValue: {
    marginLeft: wp(10),
  },
  titleValueTotalCount: {
    color: textColor.primaryGray,
  },
  skipText: {},
  topSubView: {
    width: '55%',
    alignItems: 'flex-end',
  },
  skipButtonView: {
    width: '40%',
    alignItems: 'flex-end',
  },
});
export default ProgressBar;
