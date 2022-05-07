import React from 'react';
import { AppCard, RadioButtonCircle } from '@/src/component/common';
import { StyleSheet, View } from 'react-native';
interface RadioButtonCardType {
    isSelected?: boolean;
    children?: null;
    onPressRadioButton?: null;
}
const RadioButtonCard = (props: RadioButtonCardType) => {
    const {
        isSelected = false,
        children = null,
        onPressRadioButton = null,
    } = props;
    return (
        <AppCard width={'90%'}>
            <View style={styles.mainView}>
                <View style={styles.detailsView}>{children}</View>
                <View style={styles.radioButtonView}>
                    <RadioButtonCircle
                        onPressRadioButton={onPressRadioButton}
                        isSelected={isSelected}
                    />
                </View>
            </View>
        </AppCard>
    );
};
const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
    },
    detailsView: {
        flex: 10,
    },
    radioButtonView: {
        flex: 1,
    },
});
export default RadioButtonCard;
