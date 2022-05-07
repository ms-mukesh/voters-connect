import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import { hp, wp } from '@/src/utils/screenRatio';
import { CustomFlatList, CustomText, SvgImage } from '@/src/component/common';
import { textColor, color } from '@/src/utils/color';
import {
    selectImageFromCamera,
    selectImageFromGallery,
} from '@/src/utils/utilityMethods/fileMethod/fileMethod.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { CROSS_BLACK_ICON } from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';

interface AttachmentModalType {
    onDismiss?: any;
    onChangeImage?: any;
    onClearItems?: any;
    isVisible?: boolean;
    closeModal?: any;
}
interface addPhotoOptionType {
    item: {
        name?: string;
        onPress?: any;
    };
}
const AttachmentModal = (props: AttachmentModalType) => {
    const {
        onChangeImage = null,
        onClearItems = null,
        closeModal = null,
        isVisible = false,
    } = props;
    const styleSheet = StyleSheetSelection();
    const _onOpenCamera = async () => {
        const cameraImage = await selectImageFromCamera();
        cameraImage && onChangeImage(cameraImage);
        closeModal();
    };
    const _onOpenGallery = async () => {
        const galleryImage = await selectImageFromGallery();
        galleryImage && onChangeImage(galleryImage);
        closeModal();
    };
    const _onRemoveButtonClick = () => {
        onClearItems !== null && onClearItems();
        closeModal();
    };
    let data = [
        {
            name: 'Take Photo',
            onPress: _onOpenCamera,
        },
        {
            name: 'Choose from gallery',
            onPress: _onOpenGallery,
        },
        {
            name: 'Remove',
            onPress: _onRemoveButtonClick,
        },
    ];
    // displayDocumentSelection && data.push({
    //     name: 'Document',
    //     onPress: onOpenDocument,
    //     // icon: DOCS_ICON,
    //     icon: DOCUMENT_SVG_ICON,
    //     bg: StyleGuide.ColorGuide.Color14.color,
    // });
    const _renderPhotoOption = ({ item }: addPhotoOptionType) => {
        return (
            <Pressable onPress={item?.onPress ?? null}>
                <CustomText style={styleSheet.largeRegular}>
                    {item?.name ?? ''}
                </CustomText>
                <View style={styleSheet.dividerViewRegular} />
                <View style={styleSheet.dividerView} />
            </Pressable>
        );
    };
    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
        >
            <Pressable onPress={closeModal} style={styles.mainView}>
                <View style={[styles.optionsMainView]}>
                    <Pressable onPress={closeModal}>
                        <SvgImage
                            style={styles.closeIcon}
                            height={hp(3)}
                            width={wp(3)}
                            Source={CROSS_BLACK_ICON}
                        />
                    </Pressable>
                    <View style={styleSheet.dividerViewRegular} />
                    <View style={styles.contentMainView}>
                        <CustomText style={styleSheet.mediumLargeBold}>
                            Add Photo
                        </CustomText>
                        <View style={styleSheet.dividerView} />
                        <View style={styleSheet.dividerView} />
                        <View style={styleSheet.dividerView} />
                        <View style={styles.line} />
                        <View style={styleSheet.dividerViewRegular} />
                        <View style={styleSheet.dividerViewRegular} />
                        <CustomFlatList
                            contentContainerStyle={styles.listView}
                            isRefereshAllowed={false}
                            data={data}
                            renderItem={_renderPhotoOption}
                        />
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.modalBackground,
    },
    optionsMainView: {
        backgroundColor: color.white,
        width: '90%',
        alignSelf: 'center',
        padding: hp(2),
        borderRadius: hp(0.5),
    },
    closeIcon: {
        alignSelf: 'flex-end',
    },
    contentMainView: {
        width: '95%',
        alignSelf: 'center',
    },
    line: {
        width: '100%',
        height: hp(0.1),
        backgroundColor: textColor.primaryGray,
    },
    listView: {
        paddingBottom: 0,
    },
});
export default AttachmentModal;
