import { Text, AppState } from 'react-native';
import React, { useEffect, useState } from 'react';
import { isIOS } from '@/src/utils/screenRatio';

const Timer = (props: any) => {
    const { maxTime, _isResend, restartTimer, _restartTimer } = props;
    const [count, setCount] = useState(parseInt(maxTime));
    const [min, setMin] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [backGroundTime, setBackgroundTime] = useState(new Date().getTime());
    const [againActiveTime, setAgainActiveTime] = useState(
        new Date().getTime()
    );
    const _setMinForTimer = () => {
        try {
            let temp =
                parseInt(count / 60 + '') < 10
                    ? '0' + parseInt(count / 60 + '')
                    : parseInt(count / 60 + '');
            // @ts-ignore
            setMin(temp !== undefined ? temp : '00');
        } catch (ex) {
            setMin('00');
        }
    };
    const _setSecondsForTimer = () => {
        try {
            let temp = count % 60 < 10 ? '0' + (count % 60) : count % 60;
            // @ts-ignore
            setSeconds(temp !== undefined ? temp : '00');
        } catch (ex) {
            setSeconds('00');
        }
    };

    useEffect(() => {
        _setMinForTimer();
    }, [min]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        _setSecondsForTimer();
    }, [seconds]); // eslint-disable-line react-hooks/exhaustive-deps
    // @ts-ignore
    const handleAppStateChange = async (nextAppState) => {
        if (nextAppState !== 'active') {
            setBackgroundTime(new Date().getTime());
        } else if (nextAppState === 'active') {
            setAgainActiveTime(new Date().getTime());
            let tempTime = isIOS
                ? againActiveTime - backGroundTime
                : backGroundTime - new Date().getTime();
            tempTime = Math.ceil(tempTime / 1000);
            // @ts-ignore
            setCount(parseInt(tempTime) + parseInt(count));
            setMin(min);
            setSeconds(seconds);
        }
    };

    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        // @ts-ignore
        let _interval = null;
        if (restartTimer) {
            setCount(maxTime);
            setMin(min);
            setSeconds(seconds);
            _restartTimer(false);
        }
        if (count >= 0) {
            _interval = setInterval(() => {
                // @ts-ignore
                setCount((count) => count - 1);
                setMin(min);
                setSeconds(seconds);
            }, 1000);
        } else if (count <= 0 && !restartTimer) {
            // @ts-ignore
            clearInterval(_interval);
            _isResend(true);
        }
        return () => {
            // @ts-ignore
            clearInterval(_interval);
        };
    }, [count, maxTime, restartTimer]); // eslint-disable-line react-hooks/exhaustive-deps
    return <Text>{min + ':' + seconds}</Text>;
};

export default React.memo(Timer);
