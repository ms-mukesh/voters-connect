import React from 'react';
import { Text } from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';

const CustomText = (props: any) => {
    const styleSheet = StyleSheetSelection();
    return (
        <Text
            {...props}
            allowFontScaling={false}
            style={[styleSheet.regular, props.style]}
        >
            {props.children}
        </Text>
    );
};

export default CustomText;
