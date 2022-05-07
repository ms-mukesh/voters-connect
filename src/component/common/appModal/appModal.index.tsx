import React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { color } from '@/src/utils/color';
interface AppModalType {
    children?: any;
    onPress?: any;
    visible?: boolean;
}
const AppModal = (props: AppModalType) => {
    const { onPress = null, visible = false, children = null } = props;
    return (
        <Modal transparent={true} visible={visible} onRequestClose={onPress}>
            <Pressable onPress={onPress} style={styles.mainView}>
                {children}
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
});
export default AppModal;
