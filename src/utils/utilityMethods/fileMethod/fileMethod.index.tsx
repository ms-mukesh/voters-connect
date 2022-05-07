import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';

import RNFetchBlob from 'rn-fetch-blob';

import {isANDROID} from '@/src/utils/screenRatio';
import {
  DOWNLOAD_DIRECTORY_NAME,
  MAX_IMAGE_LIMIT,
} from '@/src/utils/utilityMethods/fileMethod/fileMethod.const';
import {
  isStringNotEmpty,
  isValueDefined,
} from '@/src/utils/utilityMethods/stringMethod.index';
import RNFS from 'react-native-fs';
import * as XLSX from 'xlsx';
import {showPopupMessage} from '@/src/utils/localPopup';

export function getAge(birthdate: any) {
  if (isStringNotEmpty(birthdate)) {
    return Math.floor(
      (new Date().getTime() - new Date(birthdate).getTime()) / 3.154e10,
    );
  } else {
    return '';
  }
}
const selectImageFromCamera = () => {
  return new Promise(resolve => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: 'photo',
    })
      .then((images: any) => {
        if (images.size <= MAX_IMAGE_LIMIT) {
          return resolve(images);
        } else {
          // @ts-ignore
          console.log('can not select image file size');
          return resolve(false);
        }
      })
      .catch(e => {
        if (__DEV__) {
          console.log('failed to click image--', e);
        }
        return resolve(false);
      });
  });
};
const selectImageFromGallery = () => {
  return new Promise(resolve => {
    ImagePicker.openPicker({
      multiple: false,
      includeExif: true,
      forceJpg: true,
      // width: 400,
      // height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
      writeTempFile: false,
      showCropGuidelines: false,
      freeStyleCropEnabled: false,
      enableRotationGesture: true,
      compressImageQuality: 1,
      cropperActiveWidgetColor: '#FF6249',
      cropperStatusBarColor: '#FF6249',
      cropperToolbarColor: '#FF6249',
      cropperToolbarWidgetColor: '#ffffff',
    })
      .then(images => {
        if (images.size <= MAX_IMAGE_LIMIT) {
          return resolve(images);
        } else {
          console.log('can not select image file size');
        }
      })
      .catch(e => {
        if (__DEV__) {
          console.log('failed to select image--', e);
        }
        return resolve(false);
      });
  });
};
const selectDocument = (
  type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
) => {
  return new Promise(async resolve => {
    try {
      const res = await DocumentPicker.pick({
        type: [type],
        allowMultiSelection: false,
      });
      return resolve(res);
    } catch (ex) {
      if (__DEV__) {
        console.log('failed to select document reason--', ex);
      }
      return resolve(false);
    }
  });
};

const downloadTask = (
  url = '',
  customFileName = 'SpatikaaFile_',
  appendExt = 'pdf',
  mime = 'application/pdf',
) => {
  return new Promise(resolve => {
    try {
      if (isStringNotEmpty(url)) {
        const {config, fs} = RNFetchBlob;
        const baseDir = isANDROID ? fs.dirs.DownloadDir : fs.dirs.DocumentDir;
        const fileName = customFileName;
        const path = `${baseDir}/${DOWNLOAD_DIRECTORY_NAME}/${fileName}.${appendExt}`;
        const options = {
          fileCache: false,
          addAndroidDownloads: {
            fileCache: false,
            appendExt: appendExt,
            mime: mime,
            useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
            notification: true,
            mediaScannable: true,
            path: path,
            description: 'Downloading file.',
          },
          path: path,
        };
        config(options)
          .fetch('GET', url, {'Cache-Control': 'no-store'})
          .then(res => {
            if (isANDROID) {
              RNFetchBlob.android.actionViewIntent(res.path(), mime);
            } else {
              RNFetchBlob.ios.previewDocument(res.path());
            }
            return resolve(res);
          })
          .catch(() => {
            return resolve(false);
          });
      } else {
        return resolve(false);
      }
    } catch (ex) {
      return resolve(false);
    }
  });
};
const extractDataFromExcel = async () => {
  try {
    const docRes: any = await selectDocument();
    if (docRes && docRes.length > 0) {
      const result = await RNFS.readFile(docRes[0].uri, 'base64');
      const wb = XLSX.read(result, {type: 'base64'});
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, {header: 1});
      if (data.length > 1) {
        const header: any = data[0];
        let headerObj: any = {};
        header.map((item: any) => {
          headerObj = {...headerObj, [item]: item};
        });
        if (
          isValueDefined(headerObj?.electionId) &&
          isValueDefined(headerObj?.boothId) &&
          isValueDefined(headerObj?.voterName) &&
          isValueDefined(headerObj?.village) &&
          isValueDefined(headerObj?.voterCategory) &&
          isValueDefined(headerObj?.mandalName) &&
          isValueDefined(headerObj?.phoneNumber) &&
          isValueDefined(headerObj?.shaktiKendraName) &&
          isValueDefined(headerObj?.familyNumber) &&
          isValueDefined(headerObj?.dob)
        ) {
          return data;
        } else {
          showPopupMessage({message: 'Invalid excel file', type: 'error'});
          return false;
        }
      } else {
        showPopupMessage({message: 'Excel file is empty'});
        return false;
      }
    } else {
      showPopupMessage({message: 'wrong file selected'});
      return false;
    }
  } catch (ex) {
    showPopupMessage({message: 'Invalid excel file', type: 'error'});
    return false;
  }
};
const uriToBlob = (uri: any) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
};

export {
  uriToBlob,
  downloadTask,
  selectImageFromCamera,
  selectImageFromGallery,
  selectDocument,
  extractDataFromExcel,
};
