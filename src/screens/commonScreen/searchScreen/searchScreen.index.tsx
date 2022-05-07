import React, { useEffect, useMemo, useState } from 'react';
import {
    AppSearchBar,
    Background,
    CustomFlatList,
    CustomText,
    SvgImage,
} from '@/src/component/common';
import { Pressable, StyleSheet, View } from 'react-native';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { hp, normalize, wp } from '@/src/utils/screenRatio';
import { color } from '@/src/utils/color';
import { DIAGNOAL_BLACK } from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import { AppHeader } from '@/src/component/sections/section.index';
import { implementGoBack } from '@/src/utils/utilityMethods/generalUtility/generalUtility.index';

const SearchScreen = (props: any) => {
    const styleSheet = StyleSheetSelection();
    const [data, setData] = useState(props?.route?.params?.data ?? []);

    const [searchText, setSearchText] = useState('');
    const calculatedSearchText = useMemo(() => {
        return searchText;
    }, [searchText]);

    const calculatedData = useMemo(() => {
        return data;
    }, [data]);

    const _clearItems = () => {
        setSearchText('');
    };
    const _onChangeSearchText = (e: any) => {
        setSearchText(e?.nativeEvent?.text ?? '');
    };
    const _onPressSearchResult = (item: any) => {
        props?.route?.params?.onChange(item);
        implementGoBack(props?.navigation ?? null);
    };
    const _renderSearchList = ({ item }: any) => {
        return (
            <Pressable
                onPress={() => _onPressSearchResult(item)}
                style={styles.listMainView}
            >
                <View style={styles.detailsView}>
                    <CustomText style={styles.listSearchText}>
                        {item?.value + ', ' + item?.title}
                    </CustomText>
                    <SvgImage
                        style={styles.listIcon}
                        Source={DIAGNOAL_BLACK}
                        height={hp(3)}
                        width={wp(5)}
                    />
                </View>
                <View style={styles.dividerView} />
            </Pressable>
        );
    };
    useEffect(() => {
        setData(props?.route?.params?.data ?? []);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Background>
            <View style={styleSheet.dividerView} />
            <AppHeader navigation={props?.navigation ?? null} />
            <AppSearchBar
                onPressClear={_clearItems}
                value={calculatedSearchText}
                onChange={_onChangeSearchText}
            />
            <View style={styleSheet.dividerViewRegular} />
            <CustomFlatList
                neededEmptyScreen={false}
                contentContainerStyle={styles.flatList}
                data={calculatedData}
                renderItem={_renderSearchList}
            />
        </Background>
    );
};
const styles = StyleSheet.create({
    listMainView: {
        width: '90%',
        alignSelf: 'center',
        marginTop: hp(1),
        alignItems: 'center',
    },
    detailsView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dividerView: {
        height: hp(0.1),
        backgroundColor: color.gray,
        width: '100%',
        alignSelf: 'center',
        marginTop: hp(1),
    },
    flatList: {
        paddingBottom: hp(20),
    },
    listSearchText: {
        fontSize: normalize(13),
        fontWeight: '500',
        flex: 2,
    },
    listIcon: {
        flex: 1,
    },
    emptyScreenView: {
        marginBottom: hp(10),
    },
});
export default SearchScreen;
