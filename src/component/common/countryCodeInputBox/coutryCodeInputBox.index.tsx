import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { CustomText, SvgImage } from '@/src/component/common';
import { FONT_FAMILY } from '@/src/screens/styleSheet/fontFamily.index';
import { color, textColor } from '@/src/utils/color';
import { hp, isIOS, wp } from '@/src/utils/screenRatio';
import { isStringNotEmpty } from '@/src/utils/utilityMethods/stringMethod.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { KEYBOARD_TYPE } from '@/src/constant/generalConst';
import AppList from '@/src/component/common/appListBox/appList.index';

interface CountryCodeInputBoxType {
    header?: string;
    placeholder?: string;
    onChange?: any;
    value?: string;
    leftStaticText?: string;
    leftIcon?: string;
    leftIconPress?: any;
    rightIcon?: string;
    rightIconPress?: any;
    customHeaderStyle?: any;
    returnKeyType?: any;
    autoCapitalize?: any;
    headerTitleColor?: string;
    maxLength?: number;
    keyboardType?: any;
    secureTextEntry?: boolean;
    editable?: boolean;
    requireActionButton?: boolean;
    isActionButtonChecked?: boolean;
    actionButtonText?: string;
    actionButtonClick?: any;
    rightComponent?: any;
    onFocus?: any;
    isMandetory?: boolean;
    customTextInputMainView?: any;
    renderRightHeaderComponent?: any;
    headerRightIcon?: any;
    headerRightIconPress?: any;
    multiline?: boolean;
    blurOnSubmit?: boolean;
    autoSuggestionRequire?: boolean;
    autoSuggestionData?: any[];
    autoSuggestionDataKey?: string;
    onPressInputBox?: any;
}
const CountryCodeInputBox = (props: CountryCodeInputBoxType) => {
    const {
        header = '',
        placeholder = '',
        onChange = null,
        value = '',
        leftStaticText = '',
        leftIcon = '',
        leftIconPress = null,
        rightIcon = '',
        rightIconPress = null,
        customHeaderStyle = null,
        returnKeyType = 'done',
        autoCapitalize = 'none',
        headerTitleColor = textColor.primaryText,
        maxLength = 150,
        keyboardType = KEYBOARD_TYPE.default,
        secureTextEntry = false,
        editable = true,
        rightComponent = null,
        onFocus = null,
        isMandetory = false,
        customTextInputMainView = null,
        renderRightHeaderComponent = null,
        headerRightIcon = '',
        headerRightIconPress = null,
        multiline = false,
        blurOnSubmit = true,
        autoSuggestionData = [],
        autoSuggestionRequire = false,
        autoSuggestionDataKey = '',
        onPressInputBox = null,
    } = props;
    const styleSheet = StyleSheetSelection();
    //local stylesheet
    const styles = StyleSheet.create({
        headerTitle: {
            fontFamily: FONT_FAMILY.GilroyBold,
            color: textColor.primaryText,
        },
        textInputSubView: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        textInputMainView: {
            borderBottomColor: color.inputBoxBorderPrimary,
            borderBottomWidth: hp(0.2),
        },
        textInput: {
            fontFamily: FONT_FAMILY.GilroySemiBold,
            flex: 10,
            color: textColor.secondary,
        },
        staticLeftText: {
            fontFamily: FONT_FAMILY.GilroySemiBold,
            flex: 1,
            color: textColor.secondary,
        },
        rightIcon: {
            // flex: 1,
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        mandetoryText: {
            color: textColor.primary,
        },
    });

    //state variables
    const [showDropDownlist, setShowDropDownList] = useState(false);

    //memo variables
    const calculatedShowDropDownList = useMemo(() => {
        return showDropDownlist;
    }, [showDropDownlist]);

    const _onPressAutoSuggestionListRow = (item: any) => {
        console.log('data--', item);
    };
    const _toggleDropDownList = () => {
        setShowDropDownList(!calculatedShowDropDownList);
    };
    const _rightIconClick = () => {
        rightIconPress !== null && rightIconPress();
        _toggleDropDownList();
    };
    return (
        <View>
            <View style={styles.headerRow}>
                <CustomText
                    style={[
                        styleSheet.regular,
                        styles.headerTitle,
                        { color: headerTitleColor },
                        customHeaderStyle,
                    ]}
                >
                    {header}
                    {isMandetory && (
                        <CustomText
                            style={[
                                styleSheet.largeRegular,
                                styles.mandetoryText,
                            ]}
                        >
                            *
                        </CustomText>
                    )}
                </CustomText>
                {renderRightHeaderComponent !== null &&
                    renderRightHeaderComponent()}
                {isStringNotEmpty(headerRightIcon) && (
                    <Pressable onPress={headerRightIconPress}>
                        <SvgImage Source={headerRightIcon} />
                    </Pressable>
                )}
            </View>
            {isIOS && <View style={styleSheet.dividerView} />}
            <View style={styleSheet.dividerView} />
            <Pressable
                onPress={onPressInputBox}
                style={[styles.textInputMainView, customTextInputMainView]}
            >
                <View style={styles.textInputSubView}>
                    {isStringNotEmpty(leftStaticText) && (
                        <CustomText
                            style={[
                                styleSheet.largeRegular,
                                styles.staticLeftText,
                            ]}
                        >
                            {leftStaticText}
                        </CustomText>
                    )}
                    {isStringNotEmpty(leftIcon) && (
                        <Pressable
                            onPress={leftIconPress}
                            style={styles.rightIcon}
                        >
                            <SvgImage
                                height={hp(3)}
                                width={wp(5)}
                                Source={leftIcon}
                            />
                        </Pressable>
                    )}
                    <TextInput
                        style={[styleSheet.largeRegular, styles.textInput]}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        returnKeyType={returnKeyType}
                        placeholderTextColor={textColor.primaryGray}
                        autoCapitalize={autoCapitalize}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                        secureTextEntry={secureTextEntry}
                        editable={editable}
                        onFocus={onFocus}
                        multiline={multiline}
                        blurOnSubmit={blurOnSubmit}
                        {...props}
                    />
                    {rightComponent !== null && rightComponent()}
                    {isStringNotEmpty(rightIcon) && (
                        <Pressable
                            onPress={_rightIconClick}
                            style={styles.rightIcon}
                        >
                            <SvgImage
                                height={hp(3)}
                                width={wp(4)}
                                Source={rightIcon}
                            />
                        </Pressable>
                    )}
                </View>
                <View style={styleSheet.dividerView} />
                {isIOS && <View style={styleSheet.dividerView} />}
                {calculatedShowDropDownList &&
                    autoSuggestionRequire &&
                    isStringNotEmpty(autoSuggestionDataKey) &&
                    autoSuggestionData?.length > 0 && (
                        <AppList
                            onPress={_onPressAutoSuggestionListRow}
                            data={autoSuggestionData}
                            keyName={autoSuggestionDataKey}
                        />
                    )}
            </Pressable>
        </View>
    );
};

export default CountryCodeInputBox;
