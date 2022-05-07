import React from 'react';
import {
    AppButton,
    Background,
    CustomText,
    SvgImage,
} from '@/src/component/common';
import { StyleSheet, View } from 'react-native';
import {
    APPOINTMENT_TITLE,
    BOOK_APPOINTMENT_TITLE,
} from '@/src/screens/entrance/entrance.const.index';
import { implementStackNavigation } from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import { SCREEN_NAME } from '@/src/constant/screenConfig.const';
import { GET_STARTED_ICON } from '@/src/assets/images/svgIcons/introScreen/introScreen.index';
import { hp, wp } from '@/src/utils/screenRatio';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
const Entrance = (props: any) => {
    const _onPressStartButton = () => {
        implementStackNavigation(props?.navigation ?? null, SCREEN_NAME.login);
    };
    const styleSheet = StyleSheetSelection();
    const styles = StyleSheet.create({
        iconView: {
            flex: 2,
            ...styleSheet.centerValue,
        },
        bottomMainView: {
            flex: 1,
            ...styleSheet.centerValue,
        },
        bookAppointmentTitle: {
            textAlign: 'center',
        },
    });
    return (
        <Background>
            <View style={styleSheet.mainView}>
                <View style={styles.iconView}>
                    <SvgImage
                        Source={GET_STARTED_ICON}
                        height={hp(40)}
                        width={wp(100)}
                    />
                </View>
                <View style={styles.bottomMainView}>
                    <CustomText
                        style={[styleSheet.xxLargeBold, styleSheet.titleColor]}
                    >
                        {APPOINTMENT_TITLE}
                    </CustomText>
                    <View style={styleSheet.dividerView} />
                    <CustomText
                        style={[
                            styleSheet.largeRegular,
                            styles.bookAppointmentTitle,
                        ]}
                    >
                        {BOOK_APPOINTMENT_TITLE}
                    </CustomText>
                    <View style={styleSheet.dividerView} />
                    <View style={styleSheet.dividerView} />
                    <View style={styleSheet.dividerView} />
                    <View style={styleSheet.dividerView} />
                    <AppButton
                        width={'80%'}
                        onPress={_onPressStartButton}
                        title={'Let’s get started'}
                    />
                </View>
            </View>
        </Background>
    );
};

export default Entrance;
