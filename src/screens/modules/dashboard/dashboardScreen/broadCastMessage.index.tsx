import React, {useState} from 'react';
import {
  AppButton,
  Background,
  CustomCheckBox,
  CustomText,
  CustomTextInput,
} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {ScrollView, StyleSheet, View} from 'react-native';
import {hp} from '@/src/utils/screenRatio';
import {color} from '@/src/utils/color';
import {BROADCAST_MESSAGE_CATEGORY} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.network.const';
import {showPopupMessage} from '@/src/utils/localPopup';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
const BroadCastMessage = (props: any) => {
  const {} = props;
  const styleSheet = StyleSheetSelection();
  const [messageText, setMessageText] = useState('');
  const [allMaleChecked, setAllMaleChecked] = useState(false);
  const [allFemaleChecked, setAllFemaleChecked] = useState(false);
  const [ageFrom18To35Check, setAgeFrom18To35Check] = useState(false);
  const [ageFrom36To60Check, setAgeFrom36To60Check] = useState(false);
  const [age60PlusCheck, setAge60PlusCheck] = useState(false);
  const [allCheck, setAllCheck] = useState(false);

  const _onChangeMessage = (e: any) => {
    setMessageText(e?.nativeEvent?.text ?? '');
  };
  const _onChangeCheckBox = (checkBoxName: string) => {
    switch (checkBoxName) {
      case BROADCAST_MESSAGE_CATEGORY.all:
        setAllCheck(!allCheck);
        break;
      case BROADCAST_MESSAGE_CATEGORY.allFemale:
        setAllFemaleChecked(!allFemaleChecked);
        break;

      case BROADCAST_MESSAGE_CATEGORY.allMale:
        setAllMaleChecked(!allMaleChecked);
        break;

      case BROADCAST_MESSAGE_CATEGORY.ageFrom18To35:
        setAgeFrom18To35Check(!ageFrom18To35Check);
        break;

      case BROADCAST_MESSAGE_CATEGORY.ageFrom36To60:
        setAgeFrom36To60Check(!ageFrom36To60Check);
        break;
      case BROADCAST_MESSAGE_CATEGORY.age60Plus:
        setAge60PlusCheck(!age60PlusCheck);
        break;
      default:
        console.log('invalid');
        break;
    }
  };
  const _onPressSendMessage = () => {
    if (
      !allFemaleChecked &&
      !allCheck &&
      !allMaleChecked &&
      !ageFrom18To35Check &&
      !ageFrom36To60Check &&
      !age60PlusCheck
    ) {
      showPopupMessage({
        message: 'Please select single category to be proceed',
        type: 'error',
      });
      return;
    }
    if (!isStringNotEmpty(messageText)) {
      showPopupMessage({
        message: 'Please enter message',
        type: 'error',
      });
      return;
    }
    let categoryArray = [];
    if (allMaleChecked) {
      categoryArray.push(BROADCAST_MESSAGE_CATEGORY.allMale);
    }
    if (allFemaleChecked) {
      categoryArray.push(BROADCAST_MESSAGE_CATEGORY.allFemale);
    }
    if (allCheck) {
      categoryArray.push(BROADCAST_MESSAGE_CATEGORY.all);
    }
    if (age60PlusCheck) {
      categoryArray.push(BROADCAST_MESSAGE_CATEGORY.age60Plus);
    }
    if (ageFrom18To35Check) {
      categoryArray.push(BROADCAST_MESSAGE_CATEGORY.ageFrom18To35);
    }
    if (ageFrom36To60Check) {
      categoryArray.push(BROADCAST_MESSAGE_CATEGORY.ageFrom36To60);
    }
    const messageObj = {
      message: messageText,
      category: categoryArray,
    };
    console.log(messageObj);
  };
  return (
    <Background>
      <AppHeader
        navigation={props?.navigation ?? null}
        title={'Broadcast Message'}
      />
      <View style={styleSheet.dividerViewRegular} />
      <View style={styleSheet.contentMainView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <CustomTextInput
            placeholder={'Start typing message here....'}
            multiline={true}
            customTextInputMainView={styles.messageTextInput}
            onChange={_onChangeMessage}
            value={messageText}
          />
          <View style={styleSheet.dividerViewRegular} />
          <CustomText style={styleSheet.largeSemiBold}>Send To</CustomText>
          <View style={styleSheet.dividerView} />
          <CustomCheckBox
            onChange={() =>
              _onChangeCheckBox(BROADCAST_MESSAGE_CATEGORY.allMale)
            }
            checked={allMaleChecked}
            title={'All Male'}
          />
          <View style={styleSheet.dividerView} />
          <CustomCheckBox
            onChange={() =>
              _onChangeCheckBox(BROADCAST_MESSAGE_CATEGORY.allFemale)
            }
            checked={allFemaleChecked}
            title={'All Female'}
          />
          <View style={styleSheet.dividerView} />
          <CustomCheckBox
            checked={ageFrom18To35Check}
            title={'Age from 18-35'}
            onChange={() =>
              _onChangeCheckBox(BROADCAST_MESSAGE_CATEGORY.ageFrom18To35)
            }
          />
          <View style={styleSheet.dividerView} />
          <CustomCheckBox
            onChange={() =>
              _onChangeCheckBox(BROADCAST_MESSAGE_CATEGORY.ageFrom36To60)
            }
            checked={ageFrom36To60Check}
            title={'Age from 36-60'}
          />
          <View style={styleSheet.dividerView} />
          <CustomCheckBox
            onChange={() =>
              _onChangeCheckBox(BROADCAST_MESSAGE_CATEGORY.age60Plus)
            }
            checked={age60PlusCheck}
            title={'Age 60+'}
          />
          <View style={styleSheet.dividerView} />
          <CustomCheckBox
            onChange={() => _onChangeCheckBox(BROADCAST_MESSAGE_CATEGORY.all)}
            checked={allCheck}
            title={'All'}
          />
          <View style={styleSheet.dividerViewLarge} />

          <AppButton title={'Send'} onPress={_onPressSendMessage} />
        </ScrollView>
      </View>
    </Background>
  );
};
const styles = StyleSheet.create({
  messageTextInput: {
    height: hp(20),
    borderBottomWidth: hp(0.1),
    borderWidth: hp(0.1),
    borderColor: color.profileImageGray,
    padding: hp(2),
  },
});
export default BroadCastMessage;
