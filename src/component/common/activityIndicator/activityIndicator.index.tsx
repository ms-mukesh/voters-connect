import React from 'react';
import * as Progress from 'react-native-progress';
import { StyleSheet } from 'react-native';
import { textColor } from '@/src/utils/color';
interface ActivityIndicatorType {
    isLoading?: boolean;
}
const CustomActivityIndicator = (props: ActivityIndicatorType) => {
    const { isLoading = false } = props;
    return !isLoading ? null : (
        <Progress.Circle
            style={[styles.centerItems]}
            borderColor={textColor.primary}
            borderWidth={2}
            size={30}
            indeterminate={true}
            {...props}
        />
    );
};
const styles = StyleSheet.create({
    centerItems: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10%',
    },
});
export default CustomActivityIndicator;
