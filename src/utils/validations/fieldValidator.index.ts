import { isStringNotEmpty } from '@/src/utils/utilityMethods/stringMethod.index';

export const isEnteredValidPhoneNumber = (value: string) => {
    const numreg = /^[0-9]+$/;
    return numreg.test(value);
};
export const validatePhoneNumber = (value: string) => {
    const reg = /^[0]?[6789]\d{9}$/;
    return reg.test(value);
};
export const isInValidEmailAddress = (email: string) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};
export const validateName = (name = '') => {
    try {
        return isStringNotEmpty(name);
    } catch (ex) {
        return false;
    }
};
export const validatePassword = (name = '') => {
    try {
        const reg = /^[a-zA-Z0-9!@#$%^&*)(+=._-]{8,}$/;
        return reg.test(String(name));
    } catch (ex) {
        return false;
    }
};
