import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
const PlaceHolder = (props: any) => {
  const {rows = 10, customView = null} = props;
  const [placeHolderView, setPlaceHolderView] = useState([<View />]);
  const calculatedPlaceHolderView = useMemo(() => {
    return placeHolderView;
  }, [placeHolderView]);
  useEffect(() => {
    let i = 0;
    let dummyArray = [];
    for (i = 0; i < rows; i++) {
      dummyArray.push(customView);
    }
    setPlaceHolderView(dummyArray);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return {calculatedPlaceHolderView};
};
export default PlaceHolder;
