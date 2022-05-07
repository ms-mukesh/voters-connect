import React, { useMemo, useState } from 'react';
import { AppCard, CustomText } from '@/src/component/common';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { Pressable, StyleSheet, View } from 'react-native';
import { SvgImage } from '@/src/component/common';
import { MORE_OPTION } from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import { hp, wp } from '@/src/utils/screenRatio';
import MoreOptionModal from '@/src/component/common/moreOptionCard/moreOptionModal.index';

interface MoreOptionCardType {
    options?: { title?: string; callBack?: any }[];
    title?: string;
    children?: any[];
    marginTop?: number;
}
const MoreOptionCard = (props: MoreOptionCardType) => {
    const { options = [], title = '', children = null, marginTop = 15 } = props;
    const styleSheet = StyleSheetSelection();
    //state variables
    const [showMoreModal, setShowMoreModal] = useState(false);

    //memo variables
    const calculatedShowMoreLabel = useMemo(() => {
        return showMoreModal;
    }, [showMoreModal]);

    //methods
    const _toggleMoreOption = () => {
        setShowMoreModal(!calculatedShowMoreLabel);
    };
    const _closeModal = () => {
        setShowMoreModal(false);
    };
    return (
        <AppCard width={'90%'}>
            <View style={styles.titleView}>
                <CustomText style={styleSheet.largeSemiBold}>
                    {title}
                </CustomText>
                <Pressable
                    style={styles.moreButton}
                    onPress={_toggleMoreOption}
                >
                    <SvgImage
                        Source={MORE_OPTION}
                        height={hp(2)}
                        width={wp(5)}
                    />
                </Pressable>
            </View>
            {children}
            {calculatedShowMoreLabel && (
                <MoreOptionModal
                    isVisible={calculatedShowMoreLabel}
                    data={options}
                    displayKey={'title'}
                    closeModal={_closeModal}
                    marginTop={marginTop}
                />
            )}
        </AppCard>
    );
};
const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    moreButton: { flex: 0.2, alignItems: 'flex-end' },
});
export default MoreOptionCard;
