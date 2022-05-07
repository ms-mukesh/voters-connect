import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { DEFAULT_ALTERNATE_IMAGE, THUMBNAIL_IMAGE } from '@/src/assets/images';

import { FASTIMAGE_PRIORITY, FASTIMAGE_RESIZEMODE } from './fastImageConstant';

interface FastImageComponentType {
    containerStyle?: any;
    uri?: string;
    resizeMode?: any;
    priority?: any;
    authorization?: string;
    placeHolder?: string;
    alt?: string;
}
const FastImageComponent = (props: FastImageComponentType) => {
    const {
        containerStyle = null,
        uri = 'https://unsplash.it/400/400?image=1',
        resizeMode = FASTIMAGE_RESIZEMODE.COVER,
        priority = FASTIMAGE_PRIORITY.NORMAL,
        authorization = '123456ABC!@#',
        placeHolder = THUMBNAIL_IMAGE,
        alt = DEFAULT_ALTERNATE_IMAGE,
    } = props;

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isImageNotFound, setIsImageNotFound] = useState(false);
    return (
        <View>
            <FastImage
                style={[styles.image, containerStyle]}
                source={{
                    uri,
                    headers: { authorization },
                    priority,
                }}
                onError={() => {
                    setIsImageNotFound(true);
                }}
                onLoadStart={() => {
                    setIsImageNotFound(false);
                    setIsImageLoaded(false);
                }}
                onLoadEnd={() => {
                    setIsImageLoaded(true);
                }}
                resizeMode={resizeMode}
            />
            {!isImageLoaded && (
                <Image
                    style={[
                        styles.image,
                        containerStyle,
                        styles.placeHolderImage,
                    ]}
                    source={placeHolder}
                />
            )}
            {isImageNotFound && (
                <Image
                    style={[
                        styles.image,
                        containerStyle,
                        styles.placeHolderImage,
                    ]}
                    source={alt}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
    },
    placeHolderImage: {
        position: 'absolute',
    },
});

export default FastImageComponent;
