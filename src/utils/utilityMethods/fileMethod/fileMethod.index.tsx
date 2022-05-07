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

function getAge(birthdate: any) {
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
export const extractDataFromExcelFile = (data: any) => {
  return new Promise(async resolve => {
    if (data.length > 0) {
      let tempDataArray: any = [];
      await data.map((memberData: any) => {
        tempDataArray.push({
          VoterId:
            !isValueDefined(memberData.VoterVotingId) &&
            memberData.VoterVotingId === null
              ? 'NA'
              : memberData.VoterVotingId,
          FirstName:
            memberData.FirstName === null ? 'NA' : memberData.FirstName,
          MiddleName:
            memberData.MiddleName === null ? 'NA' : memberData.MiddleName,
          LastName: memberData.LastName === null ? 'NA' : memberData.LastName,
          Email: memberData.Email === null ? 'NA' : memberData.Email,
          DOB: memberData.DOB === null ? 'NA' : getAge(memberData.DOB),
          // AadhaarNo: memberData.AadhaarNo === null ? 'NA' : memberData.AadhaarNo,
          // MaritalStatus: memberData.MaritalStatus === null ? 'NA' : memberData.MaritalStatus,
          // BloodGroup: memberData.BloodGroup === null ? 'NA' : memberData.BloodGroup,
          // Zodiac: memberData.Zodiac === null ? 'NA' : memberData.Zodiac,
          Gender: memberData.Gender === null ? 'NA' : memberData.Gender,
          // Studies: memberData.Studies === null ? 'NA' : memberData.Studies,
          // MarriageDate: memberData.MarriageDate === null ? 'NA' : memberData.MarriageDate,
          // IsDaughterFamily:
          //     memberData.Gender.toLowerCase() === 'male'
          //         ? 'NA'
          //         : parseInt(memberData.IsDaughterFamily) === 1
          //         ? 'YES'
          //         : 'NO',
          // MotherName:
          //     memberData.MotherEntry === null
          //         ? 'NA'
          //         : `${memberData.MotherEntry.FirstName} ${memberData.MotherEntry.LastName}`,
          // FatherName: memberData.MiddleName === null ? 'NA' : memberData.MiddleName,
          // FatherInLaw:
          //     memberData.FatherInLawDetail === null
          //         ? 'NA'
          //         : `${memberData.FatherInLawDetail.FirstName} ${
          //             memberData.FatherInLawDetail.LastName
          //             }`,
          // MotherInLaw:
          //     memberData.MotherInLawDetail === null
          //         ? 'NA'
          //         : `${memberData.MotherInLawDetail.FirstName} ${
          //             memberData.MotherInLawDetail.LastName
          //             }`,
          // Occupation:
          //     memberData.OccupationDetail === null ? 'NA' : memberData.OccupationDetail.Name,
          // NativePlace:
          //     memberData.FamilyMaster === null
          //         ? 'NA'
          //         : memberData.FamilyMaster.NativePlaceMaster === null
          //         ? 'NA'
          //         : memberData.FamilyMaster.NativePlaceMaster.Name,
          HomeAddress:
            memberData.FamilyMaster === null
              ? 'NA'
              : memberData.FamilyMaster.AddressMaster.Address,
          HomeCity:
            memberData.FamilyMaster === null
              ? 'NA'
              : memberData.FamilyMaster.AddressMaster.CityOrVillageName,
          HomeState:
            memberData.FamilyMaster === null
              ? 'NA'
              : memberData.FamilyMaster.AddressMaster.StateName,
          HomeCountry:
            memberData.FamilyMaster === null
              ? 'NA'
              : memberData.FamilyMaster.AddressMaster.CountryName,
        });
      });
      resolve(tempDataArray);
    } else {
      resolve(false);
    }
  });
};

export {
  downloadTask,
  selectImageFromCamera,
  selectImageFromGallery,
  selectDocument,
};
