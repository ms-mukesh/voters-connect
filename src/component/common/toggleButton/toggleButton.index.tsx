import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { textColor, color } from '@/src/utils/color';
import { CustomText } from '@/src/component/common';

interface ToggleButtonType {
    checked?: boolean;
    title?: string;
    actionButtonClick?: any;
}
const ToggleButton = (props: ToggleButtonType) => {
    const { checked = false, title = '', actionButtonClick = null } = props;
    return (
        <View style={styles.mainView}>
            <Switch
                trackColor={{
                    false: textColor.lightGray,
                    true: textColor.primary,
                }}
                thumbColor={checked ? color.white : color.white}
                ios_backgroundColor={textColor.lightGray}
                onValueChange={actionButtonClick}
                value={checked}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
            <CustomText>{title}</CustomText>
        </View>
    );
};
const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
export default ToggleButton;
