import AsyncStorage from '@react-native-async-storage/async-storage';
import { isStringNotEmpty } from '@/src/utils/utilityMethods/stringMethod.index';

const setValueInAsyncStorage = (keyName = '', value: any = null) => {
    return new Promise(async (resolve) => {
        try {
            if (!isStringNotEmpty(keyName) || value === null) {
                return resolve(false);
            }
            await AsyncStorage.setItem(keyName, value);
            return resolve(true);
        } catch (ex) {
            if (__DEV__) {
                console.log(
                    'failed to save value in async storage reason exception--',
                    ex
                );
            }
            return resolve(false);
        }
    });
};
const getValueFromAsyncStorage = (keyName = '', returnValue: any = false) => {
    return new Promise(async (resolve) => {
        try {
            if (!isStringNotEmpty(keyName)) {
                return resolve(false);
            }
            const value = await AsyncStorage.getItem(keyName);
            if (value === null) {
                if (__DEV__) {
                    console.log('value not available in async storage');
                }
                return resolve(returnValue);
            }
            return resolve(value);
        } catch (ex) {
            if (__DEV__) {
                console.log(
                    'failed to get value from async storage reason exception--',
                    ex
                );
            }
            return resolve(returnValue);
        }
    });
};

export const removeValueFromAsyncStore = (keyName = '') => {
    return new Promise(async (resolve) => {
        try {
            if (!isStringNotEmpty(keyName)) {
                return resolve(false);
            }
            await AsyncStorage.removeItem(keyName);
            return resolve(true);
        } catch (ex) {
            if (__DEV__) {
                console.log(
                    'failed to remove value from async storage reason exception--',
                    ex
                );
            }
            return resolve(false);
        }
    });
};
export { setValueInAsyncStorage, getValueFromAsyncStorage };
