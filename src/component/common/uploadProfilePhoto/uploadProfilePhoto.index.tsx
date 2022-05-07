import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CustomText, FastImage, SvgImage } from '@/src/component/common';
import { hp, wp } from '@/src/utils/screenRatio';

import { isStringNotEmpty } from '@/src/utils/utilityMethods/stringMethod.index';
import AttachmentModal from '@/src/component/sections/attachementModal/attachementModal.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { textColor } from '@/src/utils/color';
import {
    DEFAULT_USER_ICON,
    GREEN_ADD_ICON,
} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import { ADD_PROFILE_PHOTO_DESCRIPTION_TEXT } from '@/src/component/common/uploadProfilePhoto/uploadProfilePhoto.const.index';

interface UploadProfilePhotoType {
    url?: string;
    onChangeProfileImage?: any;
    customProfileStyle?: any;
    onClearItems?: any;
    title?: string;
}
const UploadProfilePhoto = (props: UploadProfilePhotoType) => {
    const {
        url = '',
        onChangeProfileImage = null,
        // customProfileStyle = null,
        onClearItems = null,
        title = ADD_PROFILE_PHOTO_DESCRIPTION_TEXT,
    } = props;
    const styleSheet = StyleSheetSelection();
    const [openModal, setOpenModal] = useState(false);
    const calculatedOpenModal = useMemo(() => {
        return openModal;
    }, [openModal]);
    const _openActionSheet = () => {
        setOpenModal(true);
    };
    const _onDismiss = () => {
        setOpenModal(false);
    };
    return (
        <View style={styles.mainView}>
            {isStringNotEmpty(url) ? (
                <Pressable onPress={_openActionSheet} style={styles.imageView}>
                    <Pressable
                        onPress={_openActionSheet}
                        style={styles.profileImageOuterRoundView}
                    >
                        <FastImage
                            containerStyle={styles.profileImageOuterRoundView}
                            uri={url}
                        />
                    </Pressable>
                </Pressable>
            ) : (
                <Pressable onPress={_openActionSheet} style={styles.imageView}>
                    <Pressable
                        onPress={_openActionSheet}
                        style={styles.profileImageOuterRoundView}
                    >
                        <SvgImage
                            Source={DEFAULT_USER_ICON}
                            height={hp(22)}
                            width={wp(22)}
                        />
                    </Pressable>
                    <Pressable
                        onPress={_openActionSheet}
                        style={styles.addButtonView}
                    >
                        <SvgImage
                            Source={GREEN_ADD_ICON}
                            height={hp(4)}
                            width={wp(4)}
                        />
                    </Pressable>
                </Pressable>
            )}
            <View style={styles.descriptionView}>
                <CustomText
                    style={[
                        styleSheet.mediumLargeRegular,
                        styleSheet.secondaryTextColor,
                        styles.descriptionText,
                    ]}
                >
                    {title}
                </CustomText>
            </View>
            {calculatedOpenModal && (
                <AttachmentModal
                    isVisible={calculatedOpenModal}
                    closeModal={_onDismiss}
                    onChangeImage={onChangeProfileImage}
                    onClearItems={onClearItems}
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageView: {
        flex: 1,
    },
    descriptionView: {
        flex: 2,
    },
    profileImageOuterRoundView: {
        height: hp(15),
        width: hp(15),
        borderRadius: hp(7.5),
        backgroundColor: textColor.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonView: {
        height: hp(5),
        width: hp(5),
        borderRadius: hp(2.5),
        backgroundColor: textColor.lightestGray,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: wp(18),
        marginTop: hp(10.5),
    },
    descriptionText: {
        width: '80%',
        alignSelf: 'center',
    },
});
export default UploadProfilePhoto;
