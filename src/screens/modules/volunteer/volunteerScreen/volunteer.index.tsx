import React, {useEffect, useState} from 'react';
import {Background, CustomFlatList, Loader} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import {LEFT_BACK_ARROW} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import {getVolunteerListFromDb} from '@/src/screens/modules/volunteer/volunteerNetworkCall/volunteer.network.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {View} from 'react-native';
import VoterCard from '@/src/screens/modules/voterList/voterListCommon/voterCard.index';
import {implementStackNavigation} from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import FabButton from '@/src/component/common/fabButton/fabButton.index';
import {USER_ROLES} from '@/src/constant/generalConst';
import {getValueFromAsyncStorage} from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.index';
import {ASYNC_STORAGE_CONST} from '@/src/utils/utilityMethods/asynStorageMethod/asynStorage.const.index';
const Volunteer = (props: any) => {
  const {} = props;
  const fromVoterList = props?.route?.params?.fromVoterList ?? false;
  const shaktiKendraName = props?.route?.params?.shaktiKendraName ?? '';
  const mandalName = props?.route?.params?.mandalName ?? '';
  const [userRole, setUserRole]: any = useState('normal');

  const village = props?.route?.params?.village ?? '';
  const boothId = props?.route?.params?.boothId ?? '';
  const familyNumber = props?.route?.params?.familyNumber ?? '';
  const [apiLoader, setApiLoader] = useState(false);
  const [volunteerList, setVolunteerList] = useState([]);
  const styleSheet = StyleSheetSelection();
  useEffect(() => {
    getValueFromAsyncStorage(ASYNC_STORAGE_CONST.userRole).then(res => {
      if (res) {
        setUserRole(res);
      }
    });
  }, []);
  const _setVolunteerList = async () => {
    setApiLoader(true);
    const volunteerListApiRes: any = await getVolunteerListFromDb(
      fromVoterList,
      shaktiKendraName,
      mandalName,
      familyNumber,
      village,
      boothId,
    );
    setApiLoader(false);
    if (volunteerListApiRes) {
      setVolunteerList(volunteerListApiRes?.data ?? []);
    } else {
      setVolunteerList([]);
    }
  };

  useEffect(() => {
    _setVolunteerList().then(() => {});
  }, []);

  const _navigateToVolunteerDetails = (item: any) => {
    const paramsObj = {
      voterDetails: item,
      refereshList: _setVolunteerList,
      wantToAddVolunteer: true,
    };
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.volunteerDetails,
      paramsObj,
    );
  };
  const _renderVolunteerList = ({item}: any) => {
    return (
      <VoterCard
        onPressCard={() => _navigateToVolunteerDetails(item)}
        data={item}
      />
    );
  };
  const _onPressAddNewVolunteer = () => {
    const paramsObj = {
      landedForAdd: true,
      refereshList: _setVolunteerList,
      wantToAddVolunteer: true,
    };
    implementStackNavigation(
      props?.navigation ?? null,
      SCREEN_NAME.volunteerDetails,
      paramsObj,
    );
  };

  return (
    <Background>
      <Loader isLoading={apiLoader} />
      <AppHeader
        leftIcon={fromVoterList ? LEFT_BACK_ARROW : null}
        title={'Volunteer List'}
        navigation={fromVoterList ? props?.navigation ?? null : null}
        requireBackArrow={false}
      />
      <View style={styleSheet.dividerViewRegular} />
      <CustomFlatList data={volunteerList} renderItem={_renderVolunteerList} />
      {!fromVoterList && userRole === USER_ROLES.admin && (
        <FabButton onPress={_onPressAddNewVolunteer} />
      )}
    </Background>
  );
};
export default Volunteer;
