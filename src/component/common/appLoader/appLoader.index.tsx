import * as Progress from 'react-native-progress';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { textColor } from '@/src/utils/color';

interface LoaderType {
    isLoading?: boolean;
    containerStyle?: any;
}
const Loader = (props: LoaderType) => {
    const { isLoading = false, containerStyle = null } = props;
    const { loaderView } = styles;
    if (isLoading) {
        return (
            <View style={[loaderView, containerStyle]}>
                <Progress.Circle
                    style={[styles.centerItems]}
                    borderColor={textColor.primary}
                    borderWidth={2}
                    size={30}
                    indeterminate={true}
                    {...props}
                />
            </View>
        );
    }
    return null;
};
const styles = StyleSheet.create({
    loaderView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
    centerItems: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10%',
    },
});
export default Loader;
