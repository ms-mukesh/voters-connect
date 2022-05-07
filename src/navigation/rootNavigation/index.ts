import * as React from 'react';
import {
    CommonActions,
    createNavigationContainerRef,
} from '@react-navigation/native';
import { Text } from 'react-native';

export const isReadyRef = React.createRef<Text>();

export const navigationRef = createNavigationContainerRef();

export function navigate(name: any, params: any) {
    if (navigationRef?.current !== null && navigationRef.isReady()) {
        (<any>navigationRef?.current)?.navigate(name, params);
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
export function replace(name: any, params: any) {
    if (navigationRef?.current !== null && navigationRef.isReady()) {
        // Perform navigation if the app has mounted
        (<any>navigationRef?.current)?.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name, params }],
            })
        );
    } else {
        // You can decide what to do if the app hasn't mounted
        // You can ignore this, or add these actions to a queue you can call later
    }
}
