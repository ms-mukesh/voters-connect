import { STRING_REGEX } from "@/src/constant/generalConst";

export const isValueDefined = (value: string) => {
  return typeof value !== 'undefined';
};
export const isStringNotEmpty = (value: string) => {
  if (value === null) {
    return false;
  }
  if (!isValueDefined(value)) {
    return false;
  }
  return value?.toString()?.trim() !== '';
};
export const addMaskToText = (value = '', specialCharacter = 'X') => {
  if (!isStringNotEmpty(value)) {
    return '';
  } else {
    let text = value?.substring(0, 2);
    let i = 2;
    for (i = 2; i < value?.length - 2; i++) {
      text = text + specialCharacter;
    }
    text = text + value?.substring(value?.length - 2, value?.length);
    return text;
  }
};
export const removeDuplicates = (arr: any, key: string) => {
  // @ts-ignore
  const _ = [];
  return arr.filter((val: any) => {
    // @ts-ignore
    if (_.includes(val[key])) {
      return false;
    }
    _.push(val[key]);
    return val;
  });
};
export const isAlpha = (string = '') => {
  if (isStringNotEmpty(string)) {
    return STRING_REGEX.test(string);
  } else {
    return true;
  }
};
