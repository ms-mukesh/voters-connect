import React, { useEffect } from 'react';
import RNBootsplash from 'react-native-bootsplash';

import AppNavigation from '@/src/navigation';
import { EventRegister } from 'react-native-event-listeners';
import { DeviceEventEmitter } from 'react-native';
import { CUSTOM_EVENT_TYPE } from '@/src/constant/generalConst';

const App = () => {
    let init = async () => {
        try {
            await RNBootsplash.hide({ fade: true });
        } catch (error) {}
    };
    useEffect(() => {
        DeviceEventEmitter.addListener(
            CUSTOM_EVENT_TYPE.nativeAutoFillOtpEvent,
            function (e: Event) {
                EventRegister.emit(CUSTOM_EVENT_TYPE.otpAutoFillCustomEvent, e);
                // handle event and you will get a value in event object, you can log it here
            }
        );
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
        init();
    }, []);

    return <AppNavigation />;
};

export default App;
