import React, {useState} from 'react';
import {Background, Loader} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {View} from 'react-native';
import {ELECTION_TYPES, KEYBOARD_TYPE} from '@/src/constant/generalConst';
import {FIELD_TYPE} from '@/src/component/sections/appForm/appForm.const.index';
import {AppForm} from '@/src/component/sections/section.index';
import {getFormatedLastUpdatedDate} from '@/src/utils/utilityMethods/dateMethod/dateMethod.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
import {showPopupMessage} from '@/src/utils/localPopup';
import {
  addNewElectionToDb,
  updateElectionDetailsToDb,
} from '@/src/screens/modules/election/electionNetworkCall/election.network.index';
import {implementGoBack} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
const AddNewElection = (props: any) => {
  const {} = props;
  const styleSheet = StyleSheetSelection();
  const electionDetails: any = props?.route?.params?.electionDetails ?? null;
  console.log(electionDetails);
  const [apiLoader, setApiLoader] = useState(false);
  const [electionName, setElectionName] = useState(
    electionDetails?.ElectionName ?? '',
  );
  const [assemblyName, setAssemblyName] = useState(
    electionDetails?.AssemblyName ?? '',
  );
  const [loksabhaName, setLokSabhaName] = useState(
    electionDetails?.LoksabhaName ?? '',
  );
  const [vidhanSabhaName, setVidhanSabhaName] = useState(
    electionDetails?.VidhanSabhaName ?? '',
  );
  const [commisionOfficer, setComminsionOfficer] = useState(
    electionDetails?.CommisionOfficer ?? '',
  );
  const [electionDate, setElectionDate] = useState(
    electionDetails?.ElectionDate ?? new Date(),
  );
  const [electionType, setElectionType] = useState(
    electionDetails?.ElectionType ?? ELECTION_TYPES[0].title,
  );
  const [resultDate, setResultDate] = useState(
    electionDetails?.ResultDate ?? new Date(),
  );
  const [otherInformation, setOtherInformation] = useState(
    electionDetails?.OtherInformation ?? '',
  );

  // @ts-ignore
  const formFields = [
    {
      headerTitle: 'Election name',
      placeHolder: 'Enter Election name',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: electionName,
      onChangeStateMethod: setElectionName,
      fieldType: FIELD_TYPE.text,
    },
    {
      headerTitle: 'Assembly name',
      placeHolder: 'Enter Assembly name',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: assemblyName,
      onChangeStateMethod: setAssemblyName,
      fieldType: FIELD_TYPE.text,
    },
    {
      headerTitle: 'Loksabha name',
      placeHolder: 'Enter Loksabha name',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: loksabhaName,
      onChangeStateMethod: setLokSabhaName,
      fieldType: FIELD_TYPE.text,
    },
    {
      headerTitle: 'Vidhansabha name',
      placeHolder: 'Enter Vidhansabha name',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: vidhanSabhaName,
      onChangeStateMethod: setVidhanSabhaName,
      fieldType: FIELD_TYPE.text,
    },
    {
      headerTitle: 'Commission officer name',
      placeHolder: 'Enter Commission officer name',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: commisionOfficer,
      onChangeStateMethod: setComminsionOfficer,
      fieldType: FIELD_TYPE.text,
    },
    {
      headerTitle: 'Election date',
      placeHolder: 'Select Election date',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: getFormatedLastUpdatedDate(electionDate),
      onChangeStateMethod: setElectionDate,
      fieldType: FIELD_TYPE.date,
    },
    {
      headerTitle: 'Election type',
      placeHolder: 'Select Election type',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: electionType,
      onChangeStateMethod: setElectionType,
      fieldType: FIELD_TYPE.dropDown,
      pickerKeyValue: 'title',
      pickerValue: ELECTION_TYPES,
    },
    {
      headerTitle: 'Election result date',
      placeHolder: 'Select Election result date',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: getFormatedLastUpdatedDate(resultDate),
      onChangeStateMethod: setResultDate,
      fieldType: FIELD_TYPE.date,
    },
    {
      headerTitle: 'Description',
      placeHolder: 'Enter other information',
      mandatory: true,
      keyboardType: KEYBOARD_TYPE.default,
      value: otherInformation,
      onChangeStateMethod: setOtherInformation,
      fieldType: FIELD_TYPE.text,
    },
  ];

  const _iWillValidateFormFields = () => {
    if (!isStringNotEmpty(electionName)) {
      showPopupMessage({
        message: 'Please enter valid election name',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(assemblyName)) {
      showPopupMessage({
        message: 'Please enter valid assembly name',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(loksabhaName)) {
      showPopupMessage({
        message: 'Please enter valid loksabha name',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(vidhanSabhaName)) {
      showPopupMessage({
        message: 'Please enter valid vidhan sabha name',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(commisionOfficer)) {
      showPopupMessage({
        message: 'Please enter valid commission officer name',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(electionDate)) {
      showPopupMessage({
        message: 'Please select valid election date',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(electionType)) {
      showPopupMessage({
        message: 'Please select valid election type',
        type: 'error',
      });
      return false;
    }
    if (!isStringNotEmpty(resultDate) || resultDate < electionDate) {
      showPopupMessage({
        message: 'Please enter valid election result date',
        type: 'error',
      });
      return false;
    }

    return true;
  };
  const _onPressSaveButton = async () => {
    const isAllFieldValid = _iWillValidateFormFields();
    if (isAllFieldValid) {
      setApiLoader(true);
      let inputObj: any = {
        ElectionName: electionName,
        AssemblyName: assemblyName,
        LoksabhaName: loksabhaName,
        VidhanSabhaName: vidhanSabhaName,
        CommisionOfficer: commisionOfficer,
        ElectionDate: electionDate,
        OtherInformation: otherInformation,
        ResultDate: resultDate,
        ElectionType: electionType,
      };
      if (props?.route?.params?.landedForEdit) {
        inputObj = {
          ...inputObj,
          ElectionMasterId: electionDetails?.ElectionMasterId,
        };
        const updateElectionRes = await updateElectionDetailsToDb({
          data: inputObj,
        });

        if (updateElectionRes) {
          await props?.route?.params?.refereshList();
        }
      } else {
        const addElectionRes = await addNewElectionToDb({data: inputObj});
        if (addElectionRes) {
          await props?.route?.params?.refereshList();
        }
      }
      implementGoBack(props?.navigation ?? null);
      setApiLoader(false);
    }
  };

  return (
    <Background>
      <AppHeader
        title={props?.route?.params?.headerTitle ?? 'Add New Election'}
      />
      <Loader isLoading={apiLoader} />
      <View style={styleSheet.dividerViewRegular} />
      <View style={styleSheet.contentMainView}>
        <AppForm
          onPressButton={_onPressSaveButton}
          fields={formFields}
          buttonText={props?.route?.params?.landedForEdit ? 'Edit' : 'Add'}
        />
      </View>
    </Background>
  );
};
export default AddNewElection;
