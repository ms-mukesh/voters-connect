import React, {useEffect, useState} from 'react';
import {Background, Loader} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import {KEYBOARD_TYPE} from '@/src/constant/generalConst';
import {FIELD_TYPE} from '@/src/component/sections/appForm/appForm.const.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {View} from 'react-native';
import {AppForm} from '@/src/component/sections/section.index';
import {
  GENDER_ARRAY,
  VOTER_CATEGORY,
  VOTER_TYPE_ARRAY,
} from '@/src/screens/onBoarding/onBoardingUtils/onBoardUtils.const.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
import {showPopupMessage} from '@/src/utils/localPopup';
import {
  isInValidEmailAddress,
  validatePhoneNumber,
} from '@/src/utils/validations/fieldValidator.index';
import {
  addVoterDetailsInDb,
  updateVoterDetailsInDb,
} from '@/src/screens/modules/voterList/voterListNetworkCall/voterList.network';
import {implementGoBack} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';

const VolunteerDetails = (props: any) => {
  const {} = props;
  const styleSheet = StyleSheetSelection();
  const voterDetails = props?.route?.params?.voterDetails ?? null;
  const fromVoterList = props?.route?.params?.fromVoterList ?? false;
  const landedForAdd = props?.route?.params?.landedForAdd ?? false;
  const [voterName, setVoterName] = useState(voterDetails?.voterName ?? '');
  const [boothId, setBoothId] = useState(voterDetails?.boothId ?? '');
  const [electionId, setElectionId] = useState(voterDetails?.electionId ?? '');
  const [apiLoader, setApiLoader] = useState(false);
  const [emailId, setEmailId] = useState(voterDetails?.email ?? '');
  const [password, setPassword] = useState(voterDetails?.password ?? '');
  const [familyNumber, setFamilyNumber] = useState(
    voterDetails?.familyNumber ?? '',
  );
  const [gender, setGender] = useState(
    isStringNotEmpty(voterDetails?.gender ?? '')
      ? voterDetails?.gender
      : 'male',
  );
  const voterType = 'volunteer'

  const [genderIndex, setGenderIndex] = useState(0);
  const [volunteerIndex, setVolunteerIndex] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(
    voterDetails?.phoneNumber ?? '',
  );
  const [shaktiKendra, setShaktiKendra] = useState(
    voterDetails?.shaktiKendraName ?? '',
  );
  const [village, setVillage] = useState(voterDetails?.village ?? '');
  const [voterCategory, setVoterCategory] = useState(
    isStringNotEmpty(voterDetails?.voterCategory ?? '')
      ? voterDetails?.voterCategory
      : 'red',
  );
  const [voterCategoryIndex, setVoterCategoryIndex] = useState(0);
  const [mandalName, setMandalName] = useState(voterDetails?.mandalName ?? '');
  const _onChangeGender = (index: number) => {
    setGenderIndex(index);
    setGender(GENDER_ARRAY[index].title);
  };
  const _onChangeVoterType = () => {
    // setVolunteerIndex(index);
    // setVoterType(VOTER_TYPE_ARRAY[index].title);
  };
  const _onChangeVoterCategory = (index: number) => {
    setVoterCategoryIndex(index);
    setVoterCategory(VOTER_CATEGORY[index].title);
  };
  useEffect(() => {
    setGenderIndex(GENDER_ARRAY.findIndex(item => item.title === gender));
    setVoterCategoryIndex(
      VOTER_CATEGORY.findIndex(item => item.title === voterCategory),
    );
    setVolunteerIndex(
      VOTER_TYPE_ARRAY.findIndex(item => item.title === voterType),
    );
  }, [gender, voterCategory, voterType]);

  const formFields = [
    {
      headerTitle: 'Voter name',
      placeHolder: 'Enter Voter name',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: voterName,
      onChangeStateMethod: setVoterName,
      fieldType: FIELD_TYPE.text,
      editable: !fromVoterList,
    },
    {
      headerTitle: 'Phone number',
      placeHolder: 'Enter phone number',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.numeric,
      value: phoneNumber,
      onChangeStateMethod: setPhoneNumber,
      fieldType: FIELD_TYPE.text,
      maxLength: 10,
      editable: !fromVoterList,
    },
    {
      headerTitle: 'Election id',
      placeHolder: 'Enter your election id',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: electionId,
      onChangeStateMethod: setElectionId,
      fieldType: FIELD_TYPE.text,
      editable: !fromVoterList,
      selectTextOnFocus: true,
    },
    {
      headerTitle: 'Gender',
      placeHolder: 'Select Gender',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.numeric,
      selectedRadioIndex: genderIndex,
      onClickRadioButton: _onChangeGender,
      fieldType: FIELD_TYPE.radio,
      rightComponent: null,
      radioButtonData: GENDER_ARRAY,
      editable: !fromVoterList,
    },
    {
      headerTitle: 'Select User Type',
      placeHolder: 'Select User Type',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.numeric,
      selectedRadioIndex: volunteerIndex,
      onClickRadioButton: _onChangeVoterType,
      fieldType: FIELD_TYPE.radio,
      rightComponent: null,
      radioButtonData: VOTER_TYPE_ARRAY,
      editable: !fromVoterList,
    },
    {
      headerTitle: 'Voter category',
      placeHolder: 'Select voter category',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.numeric,
      selectedRadioIndex: voterCategoryIndex,
      onClickRadioButton: _onChangeVoterCategory,
      fieldType: FIELD_TYPE.radio,
      rightComponent: null,
      radioButtonData: VOTER_CATEGORY,
      editable: !fromVoterList,
    },
    {
      headerTitle: 'Family number',
      placeHolder: 'Enter family number',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: familyNumber,
      onChangeStateMethod: setFamilyNumber,
      fieldType: FIELD_TYPE.text,
      selectTextOnFocus: false,
      editable: !fromVoterList,
    },
    {
      headerTitle: 'Shaktikendra Name',
      placeHolder: 'Enter Shaktikendra Name',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: shaktiKendra,
      onChangeStateMethod: setShaktiKendra,
      fieldType: FIELD_TYPE.text,
      selectTextOnFocus: false,
      editable: !fromVoterList,
    },
    {
      headerTitle: 'Mandal name',
      placeHolder: 'Enter Mandal name',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: mandalName,
      onChangeStateMethod: setMandalName,
      fieldType: FIELD_TYPE.text,
      editable: !fromVoterList,
      selectTextOnFocus: false,
    },
    {
      headerTitle: 'Village',
      placeHolder: 'Enter Village Name',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: village,
      onChangeStateMethod: setVillage,
      fieldType: FIELD_TYPE.text,
      editable: !fromVoterList,
      selectTextOnFocus: false,
    },
    {
      headerTitle: 'Booth Id',
      placeHolder: 'Enter Booth id',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: boothId,
      onChangeStateMethod: setBoothId,
      fieldType: FIELD_TYPE.text,
      editable: !fromVoterList,
      selectTextOnFocus: false,
    },
    {
      headerTitle: 'Email Id',
      placeHolder: 'Enter Email Id',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: emailId,
      onChangeStateMethod: setEmailId,
      fieldType: FIELD_TYPE.text,
      editable: !fromVoterList,
      selectTextOnFocus: false,
    },
    {
      headerTitle: 'Password',
      placeHolder: 'Enter Password',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: password,
      onChangeStateMethod: setPassword,
      fieldType: FIELD_TYPE.text,
      editable: !fromVoterList,
      selectTextOnFocus: false,
    },
  ];

  const _iWillValidateFormField = () => {
    if (!isStringNotEmpty(voterName)) {
      showPopupMessage({
        message: 'please enter valid voter name',
        type: 'error',
      });
      return false;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      showPopupMessage({
        message: 'please enter valid voter phone number',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(electionId)) {
      showPopupMessage({
        message: 'please enter valid voter election id',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(familyNumber)) {
      showPopupMessage({
        message: 'please enter valid voter family number',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(shaktiKendra)) {
      showPopupMessage({
        message: 'please enter valid voter shakti kendra name',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(mandalName)) {
      showPopupMessage({
        message: 'please enter valid voter mandal name',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(village)) {
      showPopupMessage({
        message: 'please enter valid voter village name',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(boothId)) {
      showPopupMessage({
        message: 'please enter valid voter booth id',
        type: 'error',
      });
      return false;
    }
    if (!isInValidEmailAddress(emailId)) {
      showPopupMessage({
        message: 'please enter valid email ID',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(password) || password.length < 8) {
      showPopupMessage({
        message: 'please enter valid password with at least 8 character',
        type: 'error',
      });
      return false;
    }
    return true;
  };
  const _onPressSaveButton = async () => {
    const isAllFieldValid = _iWillValidateFormField();
    if (isAllFieldValid) {
      if (isStringNotEmpty(voterDetails?.voterUniqueId ?? '') || landedForAdd) {
        const obj = {
          boothId: boothId,
          dob: null,
          electionId: electionId,
          familyNumber: familyNumber,
          gender: GENDER_ARRAY[genderIndex].title,
          mandalName: mandalName,
          phoneNumber: phoneNumber,
          shaktiKendraName: shaktiKendra,
          village: village,
          voterCategory: VOTER_CATEGORY[voterCategoryIndex].title,
          voterName: voterName,
          voterUniqueId: voterDetails?.voterUniqueId ?? '',
          voterType: VOTER_TYPE_ARRAY[volunteerIndex].title,
          email: emailId,
          password: password,
        };
        setApiLoader(true);
        if (landedForAdd) {
          const addApiRes = await addVoterDetailsInDb({data: obj});
          if (addApiRes) {
            await props?.route?.params?.refereshList();
            implementGoBack(props?.navigation ?? null);
          }
        } else {
          const updateApiRes = await updateVoterDetailsInDb({data: obj});
          if (updateApiRes) {
            await props?.route?.params?.refereshList();
            implementGoBack(props?.navigation ?? null);
          }
        }
        setApiLoader(false);
      } else {
        showPopupMessage({message: 'something went wrong'});
      }
    }
  };

  return (
    <Background>
      <AppHeader
        title={'Volunteer details'}
        navigation={props?.navigation ?? null}
      />
      <Loader isLoading={apiLoader} />
      <View style={styleSheet.dividerViewRegular} />
      <View style={styleSheet.contentMainView}>
        <AppForm
          onPressButton={_onPressSaveButton}
          buttonText={'Save'}
          fields={formFields}
        />
        <View style={styleSheet.dividerViewRegular} />
      </View>
    </Background>
  );
};
export default VolunteerDetails;
