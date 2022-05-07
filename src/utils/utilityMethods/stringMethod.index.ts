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
