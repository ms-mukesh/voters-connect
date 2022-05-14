import React, {useEffect, useState} from 'react';
import {AppScrollView, Background, Loader} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {View} from 'react-native';
import {AppForm} from '@/src/component/sections/section.index';
import {KEYBOARD_TYPE} from '@/src/constant/generalConst';
import {FIELD_TYPE} from '@/src/component/sections/appForm/appForm.const.index';
import {
  GENDER_ARRAY,
  VOTER_CATEGORY,
} from '@/src/screens/onBoarding/onBoardingUtils/onBoardUtils.const.index';
import {
  isStringNotEmpty,
  removeDuplicates,
} from '@/src/utils/utilityMethods/stringMethod.index';
import {getFilterKeywordFromDb} from '@/src/screens/modules/election/electionNetworkCall/election.network.index';
const AppFilterScreen = (props: any) => {
  const {} = props;
  const styleSheet = StyleSheetSelection();
  const [gender, setGender] = useState('female');
  const [voterCategory, setVoterCategory] = useState('red');
  const [voterCategoryIndex, setVoterCategoryIndex] = useState(0);
  const [genderIndex, setGenderIndex] = useState(0);
  const [apiLoader, setApiLoader] = useState(false);
  const [mandalArray, setMandalArray]: any = useState([]);
  const [mandalIndex, setMandalIndex] = useState(0);
  const [shaktiKendraArray, setShaktiKendraArray]: any = useState([]);
  const [shaktiIndex, setShaktiIndex] = useState(0);
  const [boothIndex, setBoothIndex] = useState(0);
  const [boothArray, setBoothArray]: any = useState([]);
  const [villagelArray, setVillageArray]: any = useState([]);
  const [villagelIndex, setVillageIndex]: any = useState(0);
  const [familyArray, setFamilyArray]: any = useState([]);
  const [familyIndex, setFamilyIndex]: any = useState(0);
  const [formFields, setFormFields]: any = useState([...tempFormFields]);
  let tempFormFields = [
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
    },
  ];
  const _onChangeGender = (index: number) => {
    setGenderIndex(index);
    setGender(GENDER_ARRAY[index].title);
  };
  const _onChangeMandal = (index: number) => {
    console.log("data--",index)
    setMandalIndex(index);
  };
  const _onChangeVillage = (index: number) => {
    console.log("data--",index)
    setVillageIndex(index);
  };
  const _onChangeVoterCategory = (index: number) => {
    setVoterCategoryIndex(index);
    setVoterCategory(VOTER_CATEGORY[index].title);
  };

  const _setFilterKeywords = async () => {
    const filterKeywords: any = await getFilterKeywordFromDb();
    const voterFilterList = filterKeywords?.data?.voterFilterList ?? [];
    const electionFilterList = filterKeywords?.data?.electionFilterList ?? [];

    if (voterFilterList && voterFilterList?.length > 0) {
      const tempMandalArray = removeDuplicates(voterFilterList, 'mandalName');
      setMandalArray([...tempMandalArray]);
      const tempBoothArray = removeDuplicates(voterFilterList, 'boothId');
      setBoothArray([...tempBoothArray]);
      const tempShaktiKendraArray = removeDuplicates(
        voterFilterList,
        'shaktiKendraName',
      );
      setShaktiKendraArray([...tempShaktiKendraArray]);
      const tempFamilyArray = removeDuplicates(voterFilterList, 'familyNumber');
      setFamilyArray([...tempFamilyArray]);
      const tempVillageArray = removeDuplicates(voterFilterList, 'village');
      setVillageArray([...tempVillageArray]);
      const currentFormFields = [...formFields];
      currentFormFields.push(
        {
          headerTitle: 'Shakti kendra',
          placeHolder: 'Select Shakti kendra',
          mandatory: true,
          keyboardType: KEYBOARD_TYPE.numeric,
          selectedRadioIndex: genderIndex,
          onClickRadioButton: _onChangeGender,
          fieldType: FIELD_TYPE.radio,
          rightComponent: null,
          radioButtonKey: 'shaktiKendraName',
          radioButtonData: removeDuplicates(
            voterFilterList,
            'shaktiKendraName',
          ),
        },
        {
          headerTitle: 'Village',
          placeHolder: 'Select Village',
          mandatory: true,
          keyboardType: KEYBOARD_TYPE.numeric,
          selectedRadioIndex: villagelIndex,
          onClickRadioButton: _onChangeVillage,
          fieldType: FIELD_TYPE.radio,
          rightComponent: null,
          radioButtonKey: 'village',
          radioButtonData: removeDuplicates(voterFilterList, 'village'),
        },
        {
          headerTitle: 'Mandal',
          placeHolder: 'Select Mandal',
          mandatory: true,
          keyboardType: KEYBOARD_TYPE.numeric,
          selectedRadioIndex: mandalIndex,
          onClickRadioButton: _onChangeMandal,
          fieldType: FIELD_TYPE.radio,
          rightComponent: null,
          radioButtonKey: 'mandalName',
          radioButtonData: removeDuplicates(voterFilterList, 'mandalName'),
        },
        {
          headerTitle: 'Family',
          placeHolder: 'Select Family Number',
          mandatory: true,
          keyboardType: KEYBOARD_TYPE.numeric,
          selectedRadioIndex: genderIndex,
          onClickRadioButton: _onChangeGender,
          fieldType: FIELD_TYPE.radio,
          rightComponent: null,
          radioButtonKey: 'familyNumber',
          radioButtonData: removeDuplicates(voterFilterList, 'familyNumber'),
        },
        {
          headerTitle: 'Booth',
          placeHolder: 'Select Booth Number',
          mandatory: true,
          keyboardType: KEYBOARD_TYPE.numeric,
          selectedRadioIndex: genderIndex,
          onClickRadioButton: _onChangeGender,
          fieldType: FIELD_TYPE.radio,
          rightComponent: null,
          radioButtonData: removeDuplicates(voterFilterList, 'boothId'),
          radioButtonKey: 'boothId',
        },
      );
      setFormFields([...currentFormFields]);
    }


  };
  useEffect(() => {
    setApiLoader(true);
    _setFilterKeywords().then(() => {});
    setApiLoader(false);
  }, []);
  return (
    <Background>
      <AppHeader navigation={props?.navigation ?? null} title={'Back'} />
      <View style={styleSheet.dividerView} />
      <Loader isLoading={apiLoader} />
      <View style={styleSheet.contentMainView}>
        {!apiLoader && <AppForm buttonText={'Apply'} fields={formFields} />}
      </View>
    </Background>
  );
};
export default AppFilterScreen;
