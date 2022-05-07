import React from 'react';
import { StyleSheet, View } from 'react-native';
import { hp } from '@/src/utils/screenRatio';
import { gradientColors, textColor } from '@/src/utils/color';
import LinearGradient from 'react-native-linear-gradient';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
interface AppCardProps {
    children?: any;
    width?: string;
    customGradientView?: any;
    customMainView?: any;
    requiredGradient?: boolean;
    borderRadius?: any;
}
const AppCard = (props: AppCardProps) => {
    const {
        children = null,
        width = '100%',
        customGradientView = null,
        customMainView = null,
        requiredGradient = true,
        borderRadius = hp(1.5),
    } = props;
    const styleSheet = StyleSheetSelection();
    return (
        <View style={styleSheet.shadow}>
            {requiredGradient ? (
                <LinearGradient
                    colors={gradientColors.cardGradient}
                    start={{ x: 0.0, y: 1.0 }}
                    end={{ x: 1.0, y: 1.0 }}
                    style={[
                        styles.gradiant,
                        { width, borderRadius },
                        customGradientView,
                    ]}
                >
                    <View style={[styles.mainView, customMainView]}>
                        {children}
                    </View>
                </LinearGradient>
            ) : (
                <View
                    style={[styles.mainView, customMainView, { borderRadius }]}
                >
                    {children}
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    gradiant: {
        width: '100%',
        alignSelf: 'center',
        padding: hp(0.1),
        borderRadius: hp(1.5),
        borderColor: textColor.primary,
    },
    mainView: {
        backgroundColor: '#ffffff',
        width: '100%',
        padding: hp(2),
        borderRadius: hp(1.5),
        borderColor: textColor.lightGray,
        borderWidth: hp(0.1),
    },
});
export default AppCard;
