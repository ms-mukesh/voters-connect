import React from 'react';
import {
    AppButton,
    AppScrollView,
    Background,
    CustomText,
} from '@/src/component/common';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { View } from 'react-native';
import { SvgImage } from '@/src/component/common';
import { GET_STARTED_ICON } from '@/src/assets/images/svgIcons/introScreen/introScreen.index';
import { hp, wp } from '@/src/utils/screenRatio';
import styles from '@/src/screens/onBoarding/onBoardingStyle/onBoarding.stylesheet.index';
import {
    GET_STARTED_BUTTON_TEXT,
    GET_STARTED_TEXT,
    SKIP_BUTTON_TEXT,
    SPATIKKA_TEXT,
} from '@/src/screens/onBoarding/onBoardingUtils/onBoardUtils.const.index';
import { implementStackNavigation } from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';
import { SCREEN_NAME } from '@/src/constant/screenConfig.const';

const OnBoarding = (props: any) => {
    const {} = props;
    const styleSheet = StyleSheetSelection();
    const _onPressGetStarted = () => {
        implementStackNavigation(
            props?.navigation ?? null,
            SCREEN_NAME.personalDetails
        );
    };
    return (
        <Background>
            <AppScrollView>
                <View style={[styleSheet.contentMainView]}>
                    <View style={styleSheet.dividerViewRegular} />
                    <SvgImage
                        style={styles.gettingStartIcon}
                        Source={GET_STARTED_ICON}
                        height={hp(45)}
                        width={wp(80)}
                    />
                    <View style={styleSheet.dividerViewRegular} />
                    <CustomText
                        style={[
                            styles.welcomeText,
                            styleSheet.xxxLargeSemiBold,
                        ]}
                    >
                        Welcome to
                    </CustomText>
                    <CustomText
                        style={[
                            styles.welcomeText,
                            styleSheet.xLargeBold,
                            styleSheet.titleColor,
                            styles.spatikaaText,
                        ]}
                    >
                        {SPATIKKA_TEXT}
                    </CustomText>
                    <View style={styleSheet.dividerViewRegular} />
                    <CustomText
                        style={[
                            styleSheet.largeRegular,
                            styleSheet.secondaryTextColor,
                            styles.welcomeText,
                        ]}
                    >
                        {GET_STARTED_TEXT}
                    </CustomText>
                    <View style={styleSheet.dividerViewRegular} />
                    <AppButton
                        onPress={_onPressGetStarted}
                        title={GET_STARTED_BUTTON_TEXT}
                    />
                    <View style={styleSheet.dividerView} />
                    <CustomText
                        style={[
                            styles.welcomeText,
                            styleSheet.secondaryTextColor,
                        ]}
                    >
                        OR
                    </CustomText>
                    <AppButton title={SKIP_BUTTON_TEXT} inActive={true} />
                </View>
            </AppScrollView>
        </Background>
    );
};
export default OnBoarding;
