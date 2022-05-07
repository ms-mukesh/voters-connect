import React from 'react';
import { RefreshControl } from 'react-native';
const RefreshLoader = (props: any) => {
    const {} = props;
    return (
        <RefreshControl
            {...props}
            progressBackgroundColor="#fff"
            colors={[
                '#FF0000',
                '#FF7F00',
                '#FFFF00',
                '#00FF00',
                '#0000FF',
                '#4B0082',
                '#9400D3',
            ]}
        />
    );
};

export default RefreshLoader;
