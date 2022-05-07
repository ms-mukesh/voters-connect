import React from 'react';
import { color, textColor } from '@/src/utils/color';
import { Pressable, StyleSheet } from 'react-native';
import { hp, wp } from '@/src/utils/screenRatio';
import { CustomText } from '@/src/component/common';
import * as Progress from 'react-native-progress';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
interface AppButtonType {
    title?: string;
    containerStyle?: any;
    textContainerStyle?: any;
    disabled?: boolean;
    buttonLoader?: boolean;
    width?: any;
    inActive?: boolean;
    onPress?: any;
}
const AppButton = (props: AppButtonType) => {
    const {
        title = 'Button title',
        containerStyle = null,
        textContainerStyle = null,
        disabled = false,
        buttonLoader = false,
        width = wp(85),
        inActive = false,
        onPress = null,
    } = props;
    const styleSheet = StyleSheetSelection();
    //local stylesheet
    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            borderRadius: hp(2),
            backgroundColor: color.enableButton,
            justifyContent: 'center',
            height: hp(6.5),
            width: wp(85),
            marginTop: hp(1),
            alignSelf: 'center',
            ...styleSheet.shadow,
        },
        buttonText: {
            color: '#fff',
            width: wp(50),
            textAlign: 'center',
        },
        centerItems: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        inActiveButton: {
            borderWidth: hp(0.1),
            borderColor: textColor.lightGray,
            ...styleSheet.removeShadow,
        },
    });

    return (
        <Pressable
            style={[
                styles.button,
                {
                    backgroundColor: inActive
                        ? color.transparent
                        : disabled
                        ? color.disableButton
                        : color.enableButton,
                    width,
                },
                inActive ? styles.inActiveButton : null,
                containerStyle,
            ]}
            onPress={onPress}
            {...props}
            disabled={inActive ? true : disabled || buttonLoader}
        >
            {buttonLoader ? (
                <Progress.Circle
                    style={[styles.centerItems]}
                    borderColor="#ffffff"
                    borderWidth={2}
                    size={hp(2.2)}
                    indeterminate
                    {...props}
                />
            ) : (
                <CustomText
                    numberOfLines={1}
                    style={[
                        styles.buttonText,
                        styleSheet.regularBold,
                        {
                            color: inActive
                                ? textColor.lightGray
                                : disabled
                                ? color.disableButtonText
                                : color.enableButtonText,
                        },
                        textContainerStyle,
                    ]}
                >
                    {title}
                </CustomText>
            )}
        </Pressable>
    );
};

export default AppButton;
