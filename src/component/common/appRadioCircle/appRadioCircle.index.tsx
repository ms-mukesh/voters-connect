import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { hp, wp } from '@/src/utils/screenRatio';
import { textColor } from '@/src/utils/color';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { SvgImage } from '@/src/component/common';
import { RIGHT_TICK_V2_WHITE } from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';

interface RadioButtonCircleType {
    isSelected?: boolean;
    onPressRadioButton?: null;
    rightTickIcon?: null;
}
const RadioButtonCircle = (props: RadioButtonCircleType) => {
    const {
        isSelected = false,
        onPressRadioButton = null,
        rightTickIcon = RIGHT_TICK_V2_WHITE,
    } = props;
    const styleSheet = StyleSheetSelection();
    return (
        <Pressable
            onPress={onPressRadioButton}
            style={[
                styles.mainCircle,
                styleSheet.centerValue,
                isSelected && styles.selectedCircle,
            ]}
        >
            {isSelected && (
                <SvgImage height={hp(2)} width={wp(3)} Source={rightTickIcon} />
            )}
        </Pressable>
    );
};
const styles = StyleSheet.create({
    mainCircle: {
        height: hp(3),
        width: hp(3),
        borderRadius: hp(1.5),
        borderWidth: hp(0.3),
        borderColor: textColor.lightGray,
    },
    selectedCircle: {
        borderWidth: 0,
        backgroundColor: textColor.primary,
    },
});
export default RadioButtonCircle;
