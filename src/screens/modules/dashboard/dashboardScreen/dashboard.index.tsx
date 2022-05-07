import React, {useState} from 'react';
import {AppButton, Background, Loader} from '@/src/component/common';
import {extractDataFromExcel} from '@/src/utils/utilityMethods/fileMethod/fileMethod.index';
import {addBulkVoterListInDb} from '@/src/screens/modules/dashboard/dashboardNetworkCall/dashboard.index';
const Dashboard = () => {
  const [apiLoader, setApiLoader] = useState(false);
  const dashboardMenu = [
    {title:'Voter list',
    icon:''
    },

  ]
  const _addBulkData = async () => {
    setApiLoader(true);
    const excelData = await extractDataFromExcel();
    if (excelData) {
      await addBulkVoterListInDb(excelData);
    }
    setApiLoader(false);
  };
  return (
    <Background>
      <Loader isLoading={apiLoader} />

    </Background>
  );
};
export default Dashboard;
