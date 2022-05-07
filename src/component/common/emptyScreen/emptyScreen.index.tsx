import { StyleSheet, View } from 'react-native';
import React from 'react';
import { hp, normalize, wp } from '@/src/utils/screenRatio';
import { AppButton, SvgImage, CustomText } from '@/src/component/common';

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: hp(15),
        width: hp(15),
        resizeMode: 'contain',
    },
    mainTitle: {
        textAlign: 'center',
        marginTop: hp(1),
        fontFamily: 'Montserrat-Bold',
        fontSize: normalize(12),
    },
    subTitle: {
        textAlign: 'center',
        marginTop: hp(1),
        fontFamily: 'Montserrat-Medium',
        fontSize: normalize(10),
    },
});

const EmptyScreen = (props: any) => {
    const {
        emptyImage = '',
        title = 'No items available',
        subtitle = '',
        requireButton = false,
        buttonText = 'Click me',
        onButtonPress = null,
        buttonCustomStyle = null,
        customViewStyle = null,
        customSubTitleStyle = null,
        customMainTitleStyle = null,
    } = props;
    return (
        <View style={[style.container, { ...customViewStyle }]}>
            <SvgImage
                height={hp(25)}
                width={wp(100)}
                Source={emptyImage}
                style={style.image}
            />
            <CustomText style={[style.mainTitle, { ...customMainTitleStyle }]}>
                {title}
            </CustomText>
            {subtitle !== '' && (
                <CustomText style={[style.subTitle, { customSubTitleStyle }]}>
                    {subtitle}
                </CustomText>
            )}
            {requireButton && (
                <AppButton
                    containerStyle={buttonCustomStyle}
                    title={buttonText}
                    onPress={onButtonPress}
                />
            )}
        </View>
    );
};

export default EmptyScreen;
