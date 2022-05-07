import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

import CustomText from '@/src/component/common/customText';
import {color} from '@/src/utils/color';
import {RootTabParams} from '@/src/types/tab';
import {UseAppDispatch, UseAppSelector} from '@/src/lib/reduxToolkit/hooks';
import {addTodo} from '@/src/lib/reduxToolkit/reducers/todo/TodoSlice';
import {ENV_NAME} from '../constant/envConfig.index';
import {AppButton} from '@/src/component/common';
import {executeLogout} from '@/src/screens/authentication/authenticationUtils/authenticationUtils.index';

// import { Permission, PERMISSION_TYPE } from '../lib/rnpermissions';
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

const Home = ({}: Props) => {
  const {todoList, loading} = UseAppSelector(state => state.todo);

  const dispatch = UseAppDispatch();
  const [todoValue, settodoValue] = useState('');
  const rotateImage = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (__DEV__) {
      console.log('env name--', ENV_NAME);
    }
    // simple animation
    Animated.timing(rotateImage, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spin = rotateImage.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

  const onAddTodo = () => {
    if (todoValue !== '') {
      // props.addTodos(todoValue); // --> For Redux connect API
      dispatch(addTodo(todoValue));
      settodoValue('');
    } else {
      return;
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size={'large'}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFastImage
        resizeMode={'contain'}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
          headers: {Authorization: 'someAuthToken'},
          priority: FastImage.priority.normal,
        }}
        style={[styles.welcomeImage, {transform: [{rotate: spin}]}]}
      />
      <AppButton title={'Logout'} onPress={executeLogout} />
      <CustomText style={styles.heading}>Welcome to React native!</CustomText>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Todo"
          style={styles.input}
          value={todoValue}
          onChangeText={text => {
            settodoValue(text);
          }}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onAddTodo()}>
          <CustomText style={styles.buttonText}>Add</CustomText>
        </TouchableOpacity>
      </View>

      <FlatList
        // data={props.todoList} // --> For Redux connect API
        data={todoList}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{paddingTop: 20}}
        renderItem={({item}) => (
          <View style={styles.listCard}>
            <CustomText style={styles.listText} numberOfLines={1}>
              {item}
            </CustomText>
          </View>
        )}
      />
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  welcomeImage: {
    width: '100%',
    height: 250,
  },
  heading: {
    fontSize: 28,
    fontWeight: '500',
    color: color.black,
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  input: {
    width: '80%',
    paddingVertical: 16,
    paddingLeft: 14,
    backgroundColor: color.lightgray,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  buttonContainer: {
    width: '20%',
    paddingVertical: 16,
    backgroundColor: color.sky,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  listCard: {
    paddingVertical: 24,
    marginHorizontal: 30,
    marginBottom: 14,
    backgroundColor: color.lightSky,
    borderRadius: 14,
  },
  listText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
});
