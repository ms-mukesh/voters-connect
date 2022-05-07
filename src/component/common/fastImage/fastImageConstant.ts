import FastImage from 'react-native-fast-image';

export const FASTIMAGE_PRIORITY = {
    LOW: FastImage.priority.low,
    NORMAL: FastImage.priority.normal,
    HIGH: FastImage.priority.high,
};
export const FASTIMAGE_CACHE = {
    IMMUTABLE: FastImage.cacheControl.immutable,
    WEB: FastImage.cacheControl.web,
    CACHEONLY: FastImage.cacheControl.cacheOnly,
};
export const FASTIMAGE_RESIZEMODE = {
    CONTAIN: FastImage.resizeMode.contain,
    COVER: FastImage.resizeMode.cover,
    STRETCH: FastImage.resizeMode.stretch,
    CENTER: FastImage.resizeMode.center,
};
