import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { AppCard, CustomFlatList, CustomText } from '@/src/component/common';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { hp, wp } from '@/src/utils/screenRatio';
interface MoreOptionModalType {
    isVisible?: boolean;
    data?: any[];
    displayKey?: string;
    closeModal?: any;
    marginTop?: number;
}
const MoreOptionModal = (props: MoreOptionModalType) => {
    const {
        isVisible = false,
        closeModal = null,
        data = [],
        marginTop = 15,
    } = props;
    const styleSheet = StyleSheetSelection();
    const _onPressListItem = (item: any, callBack: any = null) => {
        callBack !== null && callBack(item);
    };
    const _renderOption = ({ item }: any) => {
        return (
            <Pressable
                onPress={() => _onPressListItem(item, item?.callBack ?? null)}
                style={styles.listItemMainView}
            >
                <CustomText style={styleSheet.largeSemiBold}>
                    {item?.title ?? ''}
                </CustomText>
            </Pressable>
        );
    };
    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={closeModal}
        >
            <Pressable onPress={closeModal} style={[styles.mainView]}>
                <View style={[styles.listView, { marginTop: hp(marginTop) }]}>
                    <AppCard>
                        <CustomFlatList
                            contentContainerStyle={styles.flatList}
                            data={data}
                            renderItem={_renderOption}
                        />
                    </AppCard>
                </View>
            </Pressable>
        </Modal>
    );
};
const styles = StyleSheet.create({
    mainView: {
        height: '100%',
        width: '100%',
    },
    flatList: {
        paddingBottom: 0,
    },
    listView: { alignSelf: 'flex-end', marginRight: wp(10) },
    listItemMainView: {
        padding: hp(3),
    },
});
export default MoreOptionModal;
