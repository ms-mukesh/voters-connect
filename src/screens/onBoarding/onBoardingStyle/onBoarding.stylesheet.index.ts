import { StyleSheet } from 'react-native';
import { FONT_FAMILY } from '@/src/screens/styleSheet/fontFamily.index';
import { wp } from '@/src/utils/screenRatio';
import { textColor } from '@/src/utils/color';

const styles = StyleSheet.create({
    gettingStartIcon: {
        alignSelf: 'center',
    },
    branchDescriptionText: {
        marginLeft: wp(4),
    },
    welcomeText: {
        textAlign: 'center',
        alignSelf: 'center',
    },
    spatikaaText: {
        fontFamily: FONT_FAMILY.PoppinsExtraBold,
    },
    validateEmailText: { marginRight: wp(3) },
    validateDisableText: {
        color: textColor.primaryGray,
    },
    branchHeaderView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default styles;
