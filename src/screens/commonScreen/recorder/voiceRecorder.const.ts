import { isANDROID } from '@/src/utils/screenRatio';

export const DEFAULT_RECORDING_FILE_NAME = 'SpatikaaRecording';
export const RECORDING_FILE_EXTENSION = isANDROID ? '.mp3' : '.m4a';
export const DEFAULT_RECORDING_INITIAL_TIME = '00:00:00';
