import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { AppButton, SvgImage } from '@/src/component/common';
import {
    CROSS_BLACK_ICON,
    SEARCH_ICON,
} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import { isStringNotEmpty } from '@/src/utils/utilityMethods/stringMethod.index';
import { color } from '@/src/utils/color';
import { hp, isANDROID, wp, normalize } from '@/src/utils/screenRatio';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';

interface AppSearchBarType {
    requireAddIcon?: boolean;
    value?: string;
    onChange?: any;
    placeHolder?: string;
    onButtonPress?: any;
    autoFocus?: boolean;
    customSideButton?: any;
    onPressClear?: any;
}

const AppSearchBar = (props: AppSearchBarType) => {
    const {
        requireAddIcon = false,
        value = '',
        onChange = null,
        placeHolder = 'Search',
        onButtonPress = null,
        autoFocus = false,
        customSideButton = null,
        onPressClear = null,
    } = props;
    const _onPressClear = () => {
        onPressClear !== null && onPressClear();
    };
    const styleSheet = StyleSheetSelection();
    const styles = StyleSheet.create({
        mainView: {
            flexDirection: 'row',
            width: '90%',
            alignSelf: 'center',
            alignItems: 'center',
        },
        textInputView: {
            flex: 8,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonView: {
            flex: 1.5,
        },
        searchBar: {
            width: '100%',
            // alignSelf:'center',
            backgroundColor: color.white,
            borderRadius: hp(10),
            borderColor: color.lightgray,
            borderWidth: hp(0.1),
            paddingLeft: wp(4),
            paddingTop: isANDROID ? 0 : hp(1.5),
            paddingBottom: isANDROID ? 0 : hp(1.5),
            ...styleSheet.shadow,
            flexDirection: 'row',
            alignItems: 'center',
        },
        inputBox: {
            marginLeft: wp(3),
            fontSize: normalize(13),
            color: color.black,
            width: '75%',
        },
        addButton: {
            height: hp(4),
            width: hp(4),
            borderRadius: hp(2),
            marginTop: 0,
        },
        addButtonText: {
            fontSize: normalize(15),
        },
        crossIcon: {
            flex: 1,
            marginLeft: '90%',
            position: 'absolute',
            alignItems: 'flex-end',
            width: wp(20),
        },
    });
    return (
        <View style={styles.mainView}>
            <View style={styles.textInputView}>
                <View style={styles.searchBar}>
                    <SvgImage Source={SEARCH_ICON} />
                    <TextInput
                        autoFocus={autoFocus}
                        style={styles.inputBox}
                        value={value}
                        onChange={onChange}
                        placeholder={placeHolder}
                        placeholderTextColor={color.gray}
                    />
                    {isStringNotEmpty(value) && (
                        <Pressable
                            onPress={_onPressClear}
                            style={styles.crossIcon}
                        >
                            <SvgImage Source={CROSS_BLACK_ICON} />
                        </Pressable>
                    )}
                </View>
            </View>
            {requireAddIcon && customSideButton === null && (
                <View style={styles.buttonView}>
                    <AppButton
                        onPress={onButtonPress}
                        textContainerStyle={styles.addButtonText}
                        title={'+'}
                        containerStyle={styles.addButton}
                    />
                </View>
            )}
            {requireAddIcon && customSideButton !== null && (
                <View style={styles.buttonView}>{customSideButton()}</View>
            )}
        </View>
    );
};

export default AppSearchBar;
