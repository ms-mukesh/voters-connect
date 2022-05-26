import React, {useEffect, useState} from 'react';
import {Background, Loader} from '@/src/component/common';
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
import {removeDuplicates} from '@/src/utils/utilityMethods/stringMethod.index';
import {UseAppDispatch, UseAppSelector} from '@/src/lib/reduxToolkit/hooks';
import {
  getFilterDataByElectionFromDb,
  getFilterKeywordFromDb,
} from '@/src/screens/modules/election/electionNetworkCall/election.network.index';
import {showPopupMessage} from '@/src/utils/localPopup';
import {implementGoBack} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {addFilterKeyData} from '@/src/lib/reduxToolkit/reducers/userProfile/UserProfileSlice';
const AppFilterScreen = (props: any) => {
  const {} = props;
  const isVoted = props?.route?.params?.isVoted ?? false;
  const electionMasterId = props?.route?.params?.electionMasterId ?? 0;
  const fromVoterList = props?.route?.params?.fromVoterList ?? false;
  const {filterData = null}: any = UseAppSelector(
    state => state.userProfileData,
  );
  const styleSheet = StyleSheetSelection();
  const [gender, setGender] = useState('female');
  const dispatch = UseAppDispatch();
  const [voterCategory, setVoterCategory] = useState('red');
  const [voterCategoryIndex, setVoterCategoryIndex] = useState(0);
  const [genderIndex, setGenderIndex] = useState(0);
  const [apiLoader, setApiLoader] = useState(false);
  const [mandalIndex, setMandalIndex] = useState(0);
  const [shaktiIndex, setShaktiIndex] = useState(0);
  const [boothIndex, setBoothIndex] = useState(0);
  const [villagelIndex, setVillageIndex]: any = useState(0);
  const [familyIndex, setFamilyIndex]: any = useState(0);
  const _onChangeGender = (index: number) => {
    setGenderIndex(index);
    setGender(GENDER_ARRAY[index].title);
  };
  const _onChangeMandal = (index: number) => {
    setMandalIndex(index);
  };
  const _onChangeVillage = (index: number) => {
    setVillageIndex(index);
  };
  const _onChangeFamily = (index: number) => {
    setFamilyIndex(index);
  };
  const _onChangeBooth = (index: number) => {
    setBoothIndex(index);
  };
  const _onChangeShaktiKendra = (index: number) => {
    setShaktiIndex(index);
  };

  const _onChangeVoterCategory = (index: number) => {
    setVoterCategoryIndex(index);
    setVoterCategory(VOTER_CATEGORY[index].title);
  };
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
    {
      headerTitle: 'Shakti kendra',
      placeHolder: 'Select Shakti kendra',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.numeric,
      selectedRadioIndex: shaktiIndex,
      onClickRadioButton: _onChangeShaktiKendra,
      fieldType: FIELD_TYPE.radio,
      rightComponent: null,
      radioButtonKey: 'shaktiKendraName',
      radioButtonData: removeDuplicates(
        filterData?.voterFilterList ?? [],
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
      radioButtonData: removeDuplicates(
        filterData?.voterFilterList ?? [],
        'village',
      ),
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
      radioButtonData: removeDuplicates(
        filterData?.voterFilterList ?? [],
        'mandalName',
      ),
    },
    {
      headerTitle: 'Family',
      placeHolder: 'Select Family Number',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.numeric,
      selectedRadioIndex: familyIndex,
      onClickRadioButton: _onChangeFamily,
      fieldType: FIELD_TYPE.radio,
      rightComponent: null,
      radioButtonKey: 'familyNumber',
      radioButtonData: removeDuplicates(
        filterData?.voterFilterList ?? [],
        'familyNumber',
      ),
    },
    {
      headerTitle: 'Booth',
      placeHolder: 'Select Booth Number',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.numeric,
      selectedRadioIndex: boothIndex,
      onClickRadioButton: _onChangeBooth,
      fieldType: FIELD_TYPE.radio,
      rightComponent: null,
      radioButtonData: removeDuplicates(
        filterData?.voterFilterList ?? [],
        'boothId',
      ),
      radioButtonKey: 'boothId',
    },
  ];

  const _onPressFilter = async () => {
    const madalArray = removeDuplicates(
      filterData?.voterFilterList ?? [],
      'mandalName',
    );
    const boothArray = removeDuplicates(
      filterData?.voterFilterList ?? [],
      'boothId',
    );
    const familyArray = removeDuplicates(
      filterData?.voterFilterList ?? [],
      'familyNumber',
    );
    const villageArray = removeDuplicates(
      filterData?.voterFilterList ?? [],
      'village',
    );
    const shaktiKendraNameArray = removeDuplicates(
      filterData?.voterFilterList ?? [],
      'shaktiKendraName',
    );

    const obj = {
      gender: gender,
      voterCategory: voterCategory,
      mandalName:
        madalArray?.length > 0 && mandalIndex < madalArray?.length
          ? madalArray[mandalIndex]?.mandalName ?? ''
          : '',
      villageName:
        villageArray?.length > 0 && villagelIndex < villageArray?.length
          ? villageArray[villagelIndex]?.village ?? ''
          : '',
      shaktiKendraName:
        shaktiKendraNameArray?.length > 0 &&
        shaktiIndex < shaktiKendraNameArray?.length
          ? shaktiKendraNameArray[shaktiIndex]?.shaktiKendraName ?? ''
          : '',
      family:
        familyArray?.length > 0 && familyIndex < familyArray?.length
          ? familyArray[familyIndex]?.familyNumber ?? ''
          : '',
      boothName:
        boothArray?.length > 0 && boothIndex < boothArray?.length
          ? boothArray[boothIndex]?.boothId ?? ''
          : '',
      isVoted: isVoted,
      electionId: electionMasterId,
    };
    if (fromVoterList) {
      props?.route?.params?.onChange(obj);
      implementGoBack(props?.navigation ?? null);
    } else {
      const filterDataApiRes: any = await getFilterDataByElectionFromDb({
        data: obj,
      });
      if (filterDataApiRes && filterDataApiRes?.data?.length > 0) {
        props?.route?.params?.onChange(filterDataApiRes?.data);
        implementGoBack(props?.navigation ?? null);
      } else {
        showPopupMessage({message: 'No result available', type: 'info'});
      }
    }
  };

  const _setFilterKeywords = async () => {
    const filterKey: any = await getFilterKeywordFromDb();
    if (filterKey) {
      dispatch(addFilterKeyData(filterKey?.data ?? null));
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
        {!apiLoader && (
          <AppForm
            onPressButton={_onPressFilter}
            buttonText={'Apply'}
            fields={tempFormFields}
          />
        )}
      </View>
    </Background>
  );
};
export default AppFilterScreen;
