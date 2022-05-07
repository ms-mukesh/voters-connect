import React from 'react';
import {SafeAreaView} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import CustomText from '@/src/component/common/customText';
import {RootTabParams} from '@/src/types/tab';
import {AppButton} from '@/src/component/common';
import {extractDataFromExcel} from '@/src/utils/utilityMethods/fileMethod/fileMethod.index';

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

const ContactUs = ({}: Props) => {
  const _selectFile = async () => {
    const fileData = await extractDataFromExcel();
    console.log('data here----', fileData);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomText>Welcome to Contact Us page!</CustomText>
      <AppButton title={'select file'} onPress={_selectFile} />
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
