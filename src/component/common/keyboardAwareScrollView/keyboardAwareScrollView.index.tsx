import React from 'react';
import { StyleSheet } from 'react-native';
import { hp, isIOS } from '@/src/utils/screenRatio';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppScrollView } from '@/src/component/common';

interface CustomKeyboardAwareScrollViewType {
    customStyle?: any;
    scrollEnable?: boolean;
    enableAutomaticScroll?: boolean;
    children?: any;
}
const CustomKeyboardAwareScrollView = (
    props: CustomKeyboardAwareScrollViewType
) => {
    const {
        customStyle = null,
        scrollEnable = true,
        enableAutomaticScroll = isIOS,
    } = props;
    return (
        <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={[styles.mainView, customStyle]}
            scrollEnabled={scrollEnable}
            enableAutomaticScroll={enableAutomaticScroll}
            extraScrollHeight={hp(2)}
            enableResetScrollToCoords={true}
            enableOnAndroid={true}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
        >
            <AppScrollView>{props.children}</AppScrollView>
        </KeyboardAwareScrollView>
    );
};
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
});
export default CustomKeyboardAwareScrollView;
