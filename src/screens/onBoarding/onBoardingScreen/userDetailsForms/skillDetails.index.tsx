import React, { useMemo, useState } from 'react';
import { Background, CustomText, ProgressBar } from '@/src/component/common';
import { Pressable, View } from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {
    BIO_MAX_LENGTH,
    EXPERTISE_PICKER,
    LANGUAGE_PICKER,
    PERSONAL_DETAILS_INPUT_BOX,
    SKILL_DETAILS_FORM_TITLE,
    TEMP_AVAILABLE_EXPERTISE,
    TEMP_AVAILABLE_LANGUAGES,
    TOTAL_ONBOARDING_SCREENS,
} from '@/src/screens/onBoarding/onBoardingUtils/onBoardUtils.const.index';
import {
    FIELD_TYPE,
    formFieldType,
} from '@/src/component/sections/appForm/appForm.const.index';
import { AppForm } from '@/src/component/sections/section.index';
import styles from '@/src/screens/onBoarding/onBoardingStyle/onBoarding.stylesheet.index';
import CircleAddButton from '@/src/component/common/cirlceAddButton/circleAddButton.index';
const SkillDetails = (props: any) => {
    const {} = props;
    const stylesSheet = StyleSheetSelection();
    //state variables

    const [bio, setBio] = useState('');
    const [experience, setExperience] = useState('');
    // const [languageArray, setLanguageArray] = useState([]);
    // const [expertiseArray, setExpertiseArray] = useState([]);
    // const [certificate, setCertificate] = useState('');

    //memo variables
    const calculatedBio = useMemo(() => {
        return bio;
    }, [bio]);
    const calculatedExperience = useMemo(() => {
        return experience;
    }, [experience]);
    // const calculatedLanguageArray = useMemo(()=>{
    //   return languageArray;
    // },[languageArray])
    // const calculatedExpertiseArray = useMemo(()=>{
    //   return expertiseArray;
    // },[expertiseArray])
    // const calculatedCertificate= useMemo(()=>{
    //   return certificate;
    // },[certificate])

    //form fields
    const formFields: formFieldType[] = [
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.bio.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.bio.placeHolder,
            value: calculatedBio,
            onChangeStateMethod: setBio,
            mandatory: false,
            fieldType: FIELD_TYPE.text,
            customTextInputMainView: stylesSheet.descriptionBox,
            multiline: true,
            maxLength: BIO_MAX_LENGTH,
        },
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.experience.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.experience.placeHolder,
            value: calculatedExperience,
            onChangeStateMethod: setExperience,
            mandatory: true,
            fieldType: FIELD_TYPE.text,
        },
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.language.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.language.placeHolder,
            value: calculatedExperience,
            onChangeStateMethod: setExperience,
            mandatory: true,
            fieldType: FIELD_TYPE.dropDown,
            pickerValue: TEMP_AVAILABLE_LANGUAGES,
            pickerKeyValue: 'name',
            pickerTitle: LANGUAGE_PICKER,
        },
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.expertise.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.expertise.placeHolder,
            value: calculatedExperience,
            onChangeStateMethod: setExperience,
            mandatory: true,
            fieldType: FIELD_TYPE.dropDown,
            pickerValue: TEMP_AVAILABLE_EXPERTISE,
            pickerKeyValue: 'name',
            pickerTitle: EXPERTISE_PICKER,
        },
    ];
    //additional fields
    const _renderSkillsAdditionalField = () => {
        return (
            <View>
                <CustomText style={stylesSheet.xLargeRegular}>
                    {PERSONAL_DETAILS_INPUT_BOX.certificate.title}
                </CustomText>
                <View style={stylesSheet.dividerViewRegular} />
                <Pressable onPress={null} style={styles.branchHeaderView}>
                    <CircleAddButton onPress={null} />
                    <CustomText
                        style={[
                            stylesSheet.largeSemiBold,
                            stylesSheet.secondaryTextColor,
                            styles.branchDescriptionText,
                        ]}
                    >
                        {PERSONAL_DETAILS_INPUT_BOX.certificate.placeHolder}
                    </CustomText>
                </Pressable>
                <View style={stylesSheet.dividerViewRegular} />
            </View>
        );
    };

    return (
        <Background>
            <View style={stylesSheet.dividerViewRegular} />
            <ProgressBar
                rightText={'Skip'}
                completed={2}
                total={TOTAL_ONBOARDING_SCREENS}
                percentage={40}
            />
            <View style={stylesSheet.dividerViewRegular} />
            <View style={stylesSheet.contentMainView}>
                <View style={stylesSheet.dividerViewRegular} />
                <CustomText style={stylesSheet.xLargeSemiBold}>
                    {SKILL_DETAILS_FORM_TITLE}
                </CustomText>
                <View style={stylesSheet.dividerViewRegular} />
                <AppForm
                    additionalField={_renderSkillsAdditionalField}
                    fields={formFields}
                />
            </View>
        </Background>
    );
};
export default SkillDetails;
