import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { hp, wp } from '@/src/utils/screenRatio';
import { textColor } from '@/src/utils/color';
import { SvgImage } from '@/src/component/common';
import { GREEN_ADD_ICON } from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';

interface CircleAddButton {
    onPress?: any;
}
const CircleAddButton = (props: CircleAddButton) => {
    const { onPress = null } = props;
    return (
        <Pressable onPress={onPress} style={styles.mainView}>
            <SvgImage
                Source={GREEN_ADD_ICON}
                height={hp(4.5)}
                width={wp(4.5)}
            />
        </Pressable>
    );
};
const styles = StyleSheet.create({
    mainView: {
        height: hp(7),
        width: hp(7),
        borderRadius: hp(3.5),
        borderWidth: hp(0.1),
        borderColor: textColor.primaryGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default CircleAddButton;
