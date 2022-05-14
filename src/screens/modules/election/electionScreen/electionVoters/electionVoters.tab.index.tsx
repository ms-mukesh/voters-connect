import React from 'react';
import {Background} from '@/src/component/common';
import {AppHeader} from '@/src/component/section.index';
import ElectionVotersVoteGiven from '@/src/screens/modules/election/electionScreen/electionVoters/electionVoters.voteGiven.index';
import ElectionVotersNotVoteGiven from '@/src/screens/modules/election/electionScreen/electionVoters/electionVoters.notVoteGiven.index';
import {CustomTabs} from '@/src/component/common/customTabs/customTabs.index';
const ElectionVotersTab = (props: any) => {
  const {} = props;
  const electionDetails: any = props?.route?.params?.electionDetails ?? null;
  const tabs = [
    {
      name: 'Vote Given',
      index: 0,
      screen: (
        <ElectionVotersVoteGiven electionDetails={electionDetails} {...props} />
      ),
    },
    {
      name: 'Yet to give vote',
      index: 1,
      screen: (
        <ElectionVotersNotVoteGiven
          electionDetails={electionDetails}
          {...props}
        />
      ),
    },
  ];
  console.log(electionDetails);
  return (
    <Background>
      <AppHeader
        navigation={props?.navigation ?? null}
        title={'Elections voters'}
      />
      <CustomTabs tabs={tabs} />
    </Background>
  );
};
export default ElectionVotersTab;
