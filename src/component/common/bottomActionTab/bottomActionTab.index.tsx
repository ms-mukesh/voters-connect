import React from 'react';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { View } from 'react-native';
interface BottomActionType {
    children?: any;
}
const BottomActionTab = (props: BottomActionType) => {
    const { children = null } = props;
    const styleSheet = StyleSheetSelection();
    return (
        <View style={[styleSheet.mainView, styleSheet.skyBlueBackground]}>
            {children}
        </View>
    );
};
export default BottomActionTab;
