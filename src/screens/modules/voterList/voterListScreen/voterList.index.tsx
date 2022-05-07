import React, {useEffect} from 'react';
import {Background} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {View} from 'react-native';
import {getVoterListFromDb} from '@/src/screens/modules/voterList/voterListNetworkCall/voterList.network';
const VoterList = (props: any) => {
  const {} = props;
  const styleSheet = StyleSheetSelection();
  useEffect(() => {
    getVoterListFromDb().then(() => {});
  }, []);
  return (
    <Background>
      <AppHeader title={'Back'} />
      <View style={styleSheet.dividerView} />
    </Background>
  );
};
export default VoterList;
