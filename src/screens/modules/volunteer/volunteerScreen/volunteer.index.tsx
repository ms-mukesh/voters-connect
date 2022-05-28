import React, {useEffect, useState} from 'react';
import { Background, CustomFlatList, Loader } from "@/src/component/common";
import {AppHeader} from '@/src/component/section.index';
import {LEFT_BACK_ARROW} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import {getVolunteerListFromDb} from '@/src/screens/modules/volunteer/volunteerNetworkCall/volunteer.network.index';
import StyleSheetSelection from "@/src/screens/styleSheet/styleSheet.index";
import { View } from "react-native";
import VoterCard from "@/src/screens/modules/voterList/voterListCommon/voterCard.index";
const Volunteer = (props: any) => {
  const {} = props;
  const fromVoterList = props?.route?.params?.fromVoterList ?? false;
  const shaktiKendraName = props?.route?.params?.shaktiKendraName ?? '';
  const mandalName = props?.route?.params?.mandalName ?? '';
  const village = props?.route?.params?.village ?? '';
  const boothId = props?.route?.params?.boothId ?? '';
  const familyNumber = props?.route?.params?.familyNumber ?? '';
  const [apiLoader, setApiLoader] = useState(false);
  const [volunteerList, setVolunteerList] = useState([]);
  const styleSheet = StyleSheetSelection();
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
  const _renderVolunteerList = ({item,index}:any)=>{
    return(
      <VoterCard
        // onPressCard={() => _navigateToVoterDetails(item)}
        data={item}
      />
    )
  }

  return (
    <Background>
      <Loader isLoading={apiLoader} />
      <AppHeader
        leftIcon={fromVoterList ? LEFT_BACK_ARROW : null}
        title={'Volunteer List'}
        navigation={fromVoterList ? props?.navigation ?? null : null}
      />
      <View style={styleSheet.dividerViewRegular}/>
      <CustomFlatList data={volunteerList} renderItem={_renderVolunteerList}/>
    </Background>
  );
};
export default Volunteer;
