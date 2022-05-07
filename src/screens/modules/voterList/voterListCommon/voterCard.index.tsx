import React from 'react';
import {AppCard, CustomText} from '@/src/component/common';
import {Pressable, StyleSheet, View} from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
import {hp} from '@/src/utils/screenRatio';
const VoterCard = (props: any) => {
  const {data = null, onPressCard = null} = props;
  const styleSheet = StyleSheetSelection();
  const backgroundColor = isStringNotEmpty(data?.voterCategory ?? '')
    ? data?.voterCategory
    : 'red';
  return isStringNotEmpty(data) ? (
    <Pressable onPress={onPressCard}>
      <View>
        <View style={styleSheet.dividerView} />
        <AppCard width={'90%'}>
          <View style={styleSheet.justifyContentView}>
            <CustomText style={styleSheet.regularBold}>
              {data?.voterName ?? ''}
            </CustomText>
            <View style={[styles.supportIndicatorView, {backgroundColor}]} />
          </View>
          <View style={styleSheet.dividerView} />
          <View style={styleSheet.justifyContentView}>
            <CustomText style={styleSheet.regular}>
              {data?.electionId ?? ''}
            </CustomText>
            <CustomText style={styleSheet.regular}>
              {data?.gender ?? ''}
            </CustomText>
          </View>
          <View style={styleSheet.dividerView} />
          <View style={styleSheet.justifyContentView}>
            <CustomText style={styleSheet.regular}>
              {data?.phoneNumber ?? ''}
            </CustomText>
            <CustomText style={styleSheet.regular}>
              {'Village: ' + data?.village ?? ''}
            </CustomText>
          </View>
          <View style={styleSheet.dividerView} />
        </AppCard>
      </View>
    </Pressable>
  ) : null;
};
const styles = StyleSheet.create({
  supportIndicatorView: {
    height: hp(2),
    width: hp(2),
    borderRadius: hp(1),
  },
});
export default VoterCard;
