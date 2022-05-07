import React, { useMemo, useState } from 'react';
import {
    AppCard,
    Background,
    CustomFlatList,
    CustomText,
    CustomTextInput,
    ProgressBar,
} from '@/src/component/common';
import {
    AVAILABLE_GENDER,
    branchDetailsType,
    GENDER_ARRAY,
    PERSONAL_DETAILS_FORM_TITLE,
    PERSONAL_DETAILS_INPUT_BOX,
    TOTAL_ONBOARDING_SCREENS,
} from '@/src/screens/onBoarding/onBoardingUtils/onBoardUtils.const.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { Pressable, View } from 'react-native';
import UploadProfilePhoto from '@/src/component/common/uploadProfilePhoto/uploadProfilePhoto.index';
import { KEYBOARD_TYPE } from '@/src/constant/generalConst';
import {
    FIELD_TYPE,
    formFieldType,
} from '@/src/component/sections/appForm/appForm.const.index';
import { AppForm } from '@/src/component/sections/section.index';
import styles from '@/src/screens/onBoarding/onBoardingStyle/onBoarding.stylesheet.index';
import CircleAddButton from '@/src/component/common/cirlceAddButton/circleAddButton.index';
import { hp } from '@/src/utils/screenRatio';
import { DELETE_ICON } from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import { implementStackNavigation } from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import { SCREEN_NAME } from '@/src/constant/screenConfig.const';
const PersonalDetails = (props: any) => {
    const {} = props;
    const stylesSheet = StyleSheetSelection();
    //state variables
    const [profileImage, setProfileImage] = useState('');
    const [name, setName] = useState('');
    const [mailId, setMailId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [dob, setDob] = useState('');
    const [weddingDate, setWeddingDate] = useState('');
    const [website, setWebsite] = useState('');
    const [addhar, setAddhar] = useState('');
    const [gender, setGender] = useState(AVAILABLE_GENDER.male);
    // @ts-ignore
    const [branchArray, setBranchArray]: branchDetailsType[] = useState([]);
    const calculatedProfileImage = useMemo(() => {
        return profileImage;
    }, [profileImage]);
    const calculatedName = useMemo(() => {
        return name;
    }, [name]);
    const calculatedMailId = useMemo(() => {
        return mailId;
    }, [mailId]);
    const calculatedMobile = useMemo(() => {
        return mobileNo;
    }, [mobileNo]);
    const calculatedDob = useMemo(() => {
        return dob;
    }, [dob]);
    const calculatedWeddingDate = useMemo(() => {
        return weddingDate;
    }, [weddingDate]);
    const calculatedWebsite = useMemo(() => {
        return website;
    }, [website]);
    const calculatedAddhar = useMemo(() => {
        return addhar;
    }, [addhar]);
    const calculatedGender = useMemo(() => {
        return gender;
    }, [gender]);

    // @ts-ignore
    const calculatedBranchArray: branchDetailsType[] = useMemo(() => {
        return branchArray;
    }, [branchArray]);

    //form fields

    const _renderValidateRightComponent = () => {
        return (
            <CustomText
                style={[
                    stylesSheet.underLine,
                    stylesSheet.titleColor,
                    styles.validateEmailText,
                    styles.validateDisableText,
                ]}
            >
                Validate
            </CustomText>
        );
    };
    const _onChangeGender = (index: number) => {
        setGender(index);
    };

    const formFields: formFieldType[] = [
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.name.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.name.placeHolder,
            mandatory: true,
            keyboardType: KEYBOARD_TYPE.default,
            value: calculatedName,
            onChangeStateMethod: setName,
            fieldType: FIELD_TYPE.text,
        },
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.mailId.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.mailId.placeHolder,
            mandatory: true,
            keyboardType: KEYBOARD_TYPE.default,
            value: calculatedMailId,
            onChangeStateMethod: setMailId,
            fieldType: FIELD_TYPE.text,
            rightComponent: _renderValidateRightComponent,
        },
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.mobile.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.mobile.placeHolder,
            mandatory: true,
            keyboardType: KEYBOARD_TYPE.numeric,
            value: calculatedMobile,
            onChangeStateMethod: setMobileNo,
            fieldType: FIELD_TYPE.text,
            rightComponent: _renderValidateRightComponent,
        },
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.gender.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.gender.placeHolder,
            mandatory: true,
            keyboardType: KEYBOARD_TYPE.numeric,
            selectedRadioIndex: calculatedGender,
            onClickRadioButton: _onChangeGender,
            fieldType: FIELD_TYPE.radio,
            rightComponent: null,
            radioButtonData: GENDER_ARRAY,
        },
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.dob.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.dob.placeHolder,
            mandatory: true,
            keyboardType: KEYBOARD_TYPE.default,
            value: calculatedDob,
            onChangeStateMethod: setDob,
            fieldType: FIELD_TYPE.date,
            minimumDate: new Date(2000),
            maximumDate: new Date(),
        },
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.weddingDate.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.weddingDate.placeHolder,
            mandatory: false,
            keyboardType: KEYBOARD_TYPE.default,
            value: calculatedWeddingDate,
            onChangeStateMethod: setWeddingDate,
            fieldType: FIELD_TYPE.date,
        },
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.webSite.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.webSite.placeHolder,
            mandatory: false,
            keyboardType: KEYBOARD_TYPE.default,
            value: calculatedWebsite,
            onChangeStateMethod: setWebsite,
            fieldType: FIELD_TYPE.text,
        },
        {
            headerTitle: PERSONAL_DETAILS_INPUT_BOX.aadhar.title,
            placeHolder: PERSONAL_DETAILS_INPUT_BOX.aadhar.placeHolder,
            mandatory: false,
            keyboardType: KEYBOARD_TYPE.numeric,
            value: calculatedAddhar,
            onChangeStateMethod: setAddhar,
            fieldType: FIELD_TYPE.text,
        },
    ];

    //on change method

    const _onChangeProfileImage = (data: any) => {
        setProfileImage(data?.path ?? '');
    };
    const _removeImage = () => {
        setProfileImage('');
    };
    //additional form fields

    const _onChangeBranch = async (e: any, index: number) => {
        if (index > -1) {
            const currentBranches: branchDetailsType[] = calculatedBranchArray;
            currentBranches[index].branchName = e;
            // @ts-ignore
            await setBranchArray([...currentBranches]);
            const currentBranchesForm: branchDetailsType[] =
                calculatedBranchArray;
            currentBranchesForm[index].form = _renderBranchForm(index);
            // @ts-ignore
            await setBranchArray([...currentBranchesForm]);
        }
    };
    const _onChangeBranchAddress = async (e: any, index: number) => {
        if (index > -1) {
            const currentBranches: branchDetailsType[] = calculatedBranchArray;
            currentBranches[index].branchAddress = e;
            // @ts-ignore
            await setBranchArray([...currentBranches]);
            const currentBranchesForm: branchDetailsType[] =
                calculatedBranchArray;
            currentBranchesForm[index].form = _renderBranchForm(index);
            // @ts-ignore
            await setBranchArray([...currentBranchesForm]);
        }
    };
    const _renderBranchForm = (index = 0) => {
        return (
            <AppCard requiredGradient={false} borderRadius={hp(0)}>
                <CustomTextInput
                    header={PERSONAL_DETAILS_INPUT_BOX.branchName.title}
                    placeholder={
                        PERSONAL_DETAILS_INPUT_BOX.branchName.placeHolder
                    }
                    value={calculatedBranchArray[index]?.branchName ?? ''}
                    onChange={(e: any) =>
                        _onChangeBranch(e?.nativeEvent?.text ?? '', index)
                    }
                    isMandetory={true}
                    headerRightIcon={DELETE_ICON}
                    headerRightIconPress={() => _removeBranchForm(index)}
                />
                <View style={stylesSheet.dividerViewRegular} />
                <CustomTextInput
                    multiline={true}
                    value={calculatedBranchArray[index]?.branchAddress ?? ''}
                    customTextInputMainView={stylesSheet.descriptionBox}
                    header={PERSONAL_DETAILS_INPUT_BOX.branchDescription.title}
                    onChange={(e: any) =>
                        _onChangeBranchAddress(
                            e?.nativeEvent?.text ?? '',
                            index
                        )
                    }
                    placeholder={
                        PERSONAL_DETAILS_INPUT_BOX.branchDescription.placeHolder
                    }
                    isMandetory={true}
                />
            </AppCard>
        );
    };
    const _renderBranchFormArray = ({ item, index }: any) => {
        return (
            <View key={'branchForm' + index}>
                <View style={stylesSheet.dividerViewRegular} />
                {item?.form ?? null}
                <View style={stylesSheet.dividerViewRegular} />
            </View>
        );
    };
    const _renderAddBranch = () => {
        return (
            <View>
                <CustomText style={stylesSheet.xLargeRegular}>
                    {PERSONAL_DETAILS_INPUT_BOX.branch.title}
                </CustomText>
                <View style={stylesSheet.dividerViewRegular} />
                <Pressable
                    onPress={_onPressAddNewBranch}
                    style={styles.branchHeaderView}
                >
                    <CircleAddButton onPress={_onPressAddNewBranch} />
                    <CustomText
                        style={[
                            stylesSheet.largeSemiBold,
                            stylesSheet.secondaryTextColor,
                            styles.branchDescriptionText,
                        ]}
                    >
                        {PERSONAL_DETAILS_INPUT_BOX.branch.placeHolder}
                    </CustomText>
                </Pressable>
                {calculatedBranchArray?.length > 0 && (
                    <View>
                        <CustomFlatList
                            isRefereshAllowed={false}
                            data={calculatedBranchArray}
                            renderItem={_renderBranchFormArray}
                        />
                    </View>
                )}
            </View>
        );
    };
    //logical methods
    const _onPressAddNewBranch = async () => {
        // @ts-ignore
        const currentBranches: branchDetailsType[] = calculatedBranchArray;
        const newBranchObj: branchDetailsType = {
            branchName: '',
            branchAddress: '',
            form: null,
        };
        currentBranches.push(newBranchObj);
        // @ts-ignore
        await setBranchArray([...currentBranches]);
        // @ts-ignore
        const currentBranchesForm: branchDetailsType[] = calculatedBranchArray;
        currentBranchesForm[calculatedBranchArray?.length - 1].form =
            _renderBranchForm(calculatedBranchArray?.length - 1);
        // @ts-ignore
        await setBranchArray([...currentBranchesForm]);
    };
    const _removeBranchForm = (index = -1) => {
        // @ts-ignore
        if (index > -1) {
            const currentBranches: branchDetailsType[] = calculatedBranchArray;
            currentBranches.splice(index, 1);
            // @ts-ignore
            setBranchArray([...currentBranches]);
        }
    };
    const _onPressSaveAndNextButton = () => {
        implementStackNavigation(
            props?.navigation ?? null,
            SCREEN_NAME.skillDetails
        );
    };

    return (
        <Background>
            <View style={stylesSheet.dividerViewRegular} />
            <ProgressBar
                rightText={'Skip'}
                completed={1}
                total={TOTAL_ONBOARDING_SCREENS}
                percentage={20}
            />
            <View style={stylesSheet.dividerViewRegular} />
            <View style={stylesSheet.contentMainView}>
                <View style={stylesSheet.dividerViewRegular} />
                <CustomText style={stylesSheet.xLargeSemiBold}>
                    {PERSONAL_DETAILS_FORM_TITLE}
                </CustomText>
                <View style={stylesSheet.dividerViewRegular} />
                <UploadProfilePhoto
                    onClearItems={_removeImage}
                    onChangeProfileImage={_onChangeProfileImage}
                    url={calculatedProfileImage}
                />
                <View style={stylesSheet.dividerViewRegular} />
                <AppForm
                    additionalField={_renderAddBranch}
                    fields={formFields}
                    onPressButton={_onPressSaveAndNextButton}
                />
            </View>
        </Background>
    );
};
export default PersonalDetails;
