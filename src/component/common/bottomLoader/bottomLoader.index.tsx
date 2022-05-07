import React from 'react';
import { StyleSheet, View } from 'react-native';
import { hp } from '@/src/utils/screenRatio';
import { textColor } from '@/src/utils/color';
import * as Progress from 'react-native-progress';
const BottomLoader = (props: any) => {
    const { customStyle = null, isLoading = false } = props;
    const display = isLoading ? 'flex' : 'none';
    return (
        <View style={[styles.bottomLoader, customStyle, { display }]}>
            <Progress.Circle
                borderColor="#FA6400"
                borderWidth={2}
                size={20}
                indeterminate
            />
        </View>
    );
};
const styles = StyleSheet.create({
    bottomLoader: {
        position: 'absolute',
        backgroundColor: '#fff',
        padding: hp(1),
        borderRadius: hp(30),
        bottom: hp(20),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: textColor.primary,
        borderWidth: hp(0.1),
    },
});
export default BottomLoader;
