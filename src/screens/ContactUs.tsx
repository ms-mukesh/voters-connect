import React from 'react';
import {SafeAreaView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import CustomText from '@/src/component/common/customText';
import {RootTabParams} from '@/src/types/tab';
import {AppButton} from '@/src/component/common';
import {selectDocument} from '@/src/utils/utilityMethods/fileMethod/fileMethod.index';
import * as XLSX from 'xlsx';

/*
// --> For Redux connect API

import {connect} from 'react-redux';
import {TodoData} from '../helper/interfaces';
import {addTodos} from '../store/redux/actions/TodoAction';

interface DispatchProps {
  addTodos: (value: string) => void;
}

type Props = DispatchProps & TodoData;
*/

type Props = {
  navigation: StackNavigationProp<RootTabParams, 'home'>;
};

const convertToJson = (csv: any) => {
  var lines = csv.split('\n');

  var result = [];

  var headers = lines[0].split(',');

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(',');

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
};
const ContactUs = ({}: Props) => {
  const _openDocPicker = async () => {
    const docRes: any = await selectDocument();
    if (docRes) {
      const f = docRes[0]?.uri;
      var name = f.name;
      const reader = new FileReader();
      reader.onload = evt => {
        // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, {type: 'binary'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, {header: 1});
        /* Update state */
        console.log('Data>>>' + data); // shows that excel data is read
        console.log(convertToJson(data)); // shows data in json format
      };
      // reader.readAsBinaryString(f);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomText>Welcome to Contact Us page!</CustomText>
      <AppButton title={'select file'} onPress={_openDocPicker} />
    </SafeAreaView>
  );
};

/*
--> For Redux connect API
const mapStateToProps = (state: {todo: TodoData}) => {
  return {
    todoList: state.todo.todoList,
  };
};

const mapDispatchToProps = {
  addTodos: (value: string) => addTodos(value),
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
*/

export default ContactUs;
