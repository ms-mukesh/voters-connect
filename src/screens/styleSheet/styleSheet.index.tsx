import { UseAppSelector } from '@/src/lib/reduxToolkit/hooks';
import { FONT_SIZE } from '@/src/screens/styleSheet/fontFamily.index';
import styleSheetRegular from '@/src/screens/styleSheet/styleSheetRegular.index';
import styleSheetSmall from '@/src/screens/styleSheet/styleSheetSmall.index';
import styleSheetLarge from '@/src/screens/styleSheet/styleSheetLarge.index';
import generalStyleSheet from '@/src/screens/styleSheet/generalStyleSheet';
const StyleSheetSelection = () => {
    const { fontSize } = UseAppSelector((state) => state.typoGraphy);
    switch (fontSize) {
        case FONT_SIZE.medium:
            return { ...generalStyleSheet, ...styleSheetRegular };
        case FONT_SIZE.large:
            return { ...generalStyleSheet, ...styleSheetLarge };
        case FONT_SIZE.small:
            return { ...generalStyleSheet, ...styleSheetSmall };
        default:
            return { ...generalStyleSheet, ...styleSheetRegular };
    }
};
export default StyleSheetSelection;
