import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { hp, wp } from '@/src/utils/screenRatio';
import { SvgImage } from '@/src/component/common';
import {
    PAUSE_WHITE,
    RIGHT_TICK_V2_WHITE,
} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';

interface SavePauseOptionType {
    onPressSave?: any;
    onPressPause?: any;
    pauseState?: boolean;
}
const SavePauseOption = (props: SavePauseOptionType) => {
    const {
        onPressPause = null,
        onPressSave = null,
        pauseState = false,
    } = props;
    const styleSheet = StyleSheetSelection();
    return (
        <View style={styles.mainView}>
            <Pressable
                onPress={onPressPause}
                style={[
                    styleSheet.actionButton,
                    styleSheet.primaryBackground,
                    styleSheet.centerValue,
                ]}
            >
                <SvgImage
                    Source={pauseState ? RIGHT_TICK_V2_WHITE : PAUSE_WHITE}
                    height={hp(5)}
                    width={wp(5)}
                />
            </Pressable>
            <Pressable
                onPress={onPressSave}
                style={[
                    styleSheet.actionButton,
                    styleSheet.primaryBackground,
                    styleSheet.centerValue,
                ]}
            >
                <SvgImage
                    Source={RIGHT_TICK_V2_WHITE}
                    height={hp(5)}
                    width={wp(5)}
                />
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        marginHorizontal: wp(20),
    },
});
export default SavePauseOption;
