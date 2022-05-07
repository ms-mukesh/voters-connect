import React, { useEffect, useState } from 'react';
import {
    Background,
    BottomActionTab,
    CustomText,
} from '@/src/component/common';
import { AppHeader } from '@/src/component/sections/section.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import { Platform, Pressable, View } from 'react-native';
import { SavePauseOption } from '@/src/component/common/bottomActionTab/bottomActionOptions/bottomActionOption.index';
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
    RecordBackType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import { recorderPermission } from '@/src/utils/permission/permission.index';
import {
    DEFAULT_RECORDING_FILE_NAME,
    DEFAULT_RECORDING_INITIAL_TIME,
    RECORDING_FILE_EXTENSION,
} from '@/src/screens/commonScreen/recorder/voiceRecorder.const';

const VoiceRecorder = (props: any) => {
    const {} = props;
    const dirs = RNFetchBlob.fs.dirs;
    const fileName = DEFAULT_RECORDING_FILE_NAME + new Date().getTime();
    const path = Platform.select({
        ios: fileName + RECORDING_FILE_EXTENSION,
        android: `${dirs.DownloadDir}/${fileName}${RECORDING_FILE_EXTENSION}`,
    });
    let audioRecorderPlayer = new AudioRecorderPlayer();
    const styleSheet = StyleSheetSelection();
    //state varaibles
    // const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [recordSecs, setRecordSecs] = useState(0);
    const [recordTime, setRecordTime] = useState(
        DEFAULT_RECORDING_INITIAL_TIME
    );
    // const [currentPositionSec, setCurrentPositionSec] = useState(0);
    // const [currentDurationSec, setCurrentDurationSec] = useState(0)
    // const [playTime, setPlayTime] = useState(DEFAULT_RECORDING_INITIAL_TIME);
    // const [durationime, setDurationTime] = useState(DEFAULT_RECORDING_INITIAL_TIME);
    const [pauseState, setPauseState] = useState(false);
    console.log(recordSecs);
    //record audio config

    // const _onStatusPress = React.useCallback((e: any) => {
    //     const touchX = e.nativeEvent.locationX;
    //     console.log(`touchX: ${touchX}`);
    //     const playWidth =
    //         (currentPositionSec / currentDurationSec) *
    //         (screenWidth - 56);
    //     console.log(`currentPlayWidth: ${playWidth}`);
    //
    //     const currentPosition = Math.round(currentPositionSec);
    //
    //     if (playWidth && playWidth < touchX) {
    //         const addSecs = Math.round(currentPosition + 1000);
    //         audioRecorderPlayer.seekToPlayer(addSecs);
    //         console.log(`addSecs: ${addSecs}`);
    //     } else {
    //         const subSecs = Math.round(currentPosition - 1000);
    //         audioRecorderPlayer.seekToPlayer(subSecs);
    //         console.log(`subSecs: ${subSecs}`);
    //     }
    // }, [])

    const _onStartRecord = React.useCallback(async () => {
        const doMyAppHaveRecordPermission = await recorderPermission();
        if (doMyAppHaveRecordPermission) {
            const audioSet: AudioSet = {
                AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                AudioSourceAndroid: AudioSourceAndroidType.MIC,
                AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
                AVNumberOfChannelsKeyIOS: 2,
                AVFormatIDKeyIOS: AVEncodingOption.aac,
            };

            console.log('audioSet', audioSet);
            //? Custom path
            const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

            audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
                console.log('record-back', e);
                setRecordSecs(e.currentPosition);
                setRecordTime(
                    audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))
                );
            });
            console.log(`uri: ${uri}`);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const _onStopRecord = React.useCallback(async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordSecs(0);
        setRecordTime(DEFAULT_RECORDING_INITIAL_TIME);
        setPauseState(false);
        console.log(result);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const _onPauseRecord = React.useCallback(async () => {
        setPauseState(true);
        try {
            await audioRecorderPlayer.pauseRecorder();
        } catch (err) {
            console.log('pauseRecord', err);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const _onResumeRecord = React.useCallback(async () => {
        setPauseState(false);
        try {
            await audioRecorderPlayer.resumeRecorder();
        } catch (err) {
            console.log('_onResumeRecord', err);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // const _onStartPlay = React.useCallback(async () => {
    //     try {
    //         console.log('onStartPlay');
    //         //? Custom path
    //         await audioRecorderPlayer.startPlayer(path);
    //
    //         //? Default path
    //         // const msg = await this.audioRecorderPlayer.startPlayer();
    //         await audioRecorderPlayer.setVolume(1.0);
    //         audioRecorderPlayer.addPlayBackListener((e: PlayBackType) => {
    //             setCurrentPositionSec(e.currentPosition);
    //             setCurrentDurationSec(e.duration);
    //             setPlayTime(audioRecorderPlayer.mmssss(
    //                 Math.floor(e.currentPosition),
    //             ))
    //             setDurationTime(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
    //         });
    //     } catch (err) {
    //         console.log('_onStartPlay', err);
    //     }
    // }, [])

    // const _onPausePlay = React.useCallback(async () => {
    //     try {
    //         await audioRecorderPlayer.pausePlayer();
    //     } catch (err) {
    //         console.log('_onResumeRecord', err);
    //     }
    // }, [])
    //
    // const _onResumePlay = React.useCallback(async () => {
    //     try {
    //         await audioRecorderPlayer.resumePlayer();
    //     } catch (err) {
    //         console.log('_onResumeRecord', err);
    //     }
    // }, [])
    //
    // const _onStopPlay = React.useCallback(async () => {
    //     try {
    //         console.log('onStopPlay');
    //         audioRecorderPlayer.stopPlayer();
    //         audioRecorderPlayer.removePlayBackListener();
    //     } catch (err) {
    //         console.log('_onResumeRecord', err);
    //     }
    // }, [])

    useEffect(() => {
        audioRecorderPlayer.setSubscriptionDuration(0.1).then(() => {}); // optional. Default is 0.5
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Background>
            <AppHeader />
            <View style={styleSheet.mainView}>
                <View style={styleSheet.detailsView}>
                    <View
                        style={[
                            styleSheet.contentMainView,
                            styleSheet.centerValue,
                        ]}
                    >
                        <CustomText>{recordTime}</CustomText>
                        <Pressable
                            onPress={_onStartRecord}
                            style={[
                                styleSheet.primaryBackground,
                                styleSheet.microPhoneView,
                                styleSheet.centerValue,
                            ]}
                        />
                    </View>
                </View>
                <View style={styleSheet.bottomActionView}>
                    <BottomActionTab>
                        <SavePauseOption
                            pauseState={pauseState}
                            onPressPause={
                                pauseState ? _onResumeRecord : _onPauseRecord
                            }
                            onPressSave={_onStopRecord}
                        />
                    </BottomActionTab>
                </View>
            </View>
        </Background>
    );
};
export default VoiceRecorder;
