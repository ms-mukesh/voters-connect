import {Linking, Share} from 'react-native';
import {isANDROID} from '@/src/utils/screenRatio';
import {isStringNotEmpty} from '../stringMethod.index';
import {showPopupMessage} from '@/src/utils/localPopup';

const sendWhatsUpMessage = (number: '', message = 'Hello') => {
  return new Promise(resolve => {
    if (!isStringNotEmpty(number)) {
      if (__DEV__) {
        console.log('error while sending whatsup message---please send number');
      }
      return resolve(false);
    }
    try {
      let prefix = number.length === 10 ? '91' : '';
      Linking.openURL(
        'whatsapp://send?text=' + message + '&phone=' + prefix + number + '',
      )
        .then(() => {
          return resolve(true);
        })
        .catch(err => {
          if (__DEV__) {
            console.log('error while sending whatsup message---', err);
          }
          return resolve(false);
        });
    } catch (ex) {
      if (__DEV__) {
        console.log('error while sending whatsup message---', ex);
      }
      return resolve(false);
    }
  });
};
const connectToCall = (number = '') => {
  return new Promise(resolve => {
    if (!isStringNotEmpty(number)) {
      if (__DEV__) {
        console.log('error while connect to call---please send number');
      }
      return resolve(false);
    }
    try {
      const phoneNumber = isANDROID ? `tel://${number}` : `tel:${number}`;
      Linking.canOpenURL(phoneNumber)
        .then(supported => {
          if (!supported) {
            if (__DEV__) {
              console.log('could not make call, its not supported');
            }
            return resolve(false);
          } else {
            Linking.openURL(phoneNumber)
              .then(() => {
                return resolve(true);
              })
              .catch(err => {
                console.log('could not make call, reason--', err);
                return resolve(false);
              });
          }
        })
        .catch(err => {
          if (__DEV__) {
            console.log('could not make call,reason--', err);
          }
          return resolve(false);
        });
    } catch (ex) {
      if (__DEV__) {
        console.log('error while connect to call---', ex);
      }
    }
  });
};
const sendEmail = (mailId = '', subject = 'Arkhive', message = '') => {
  return new Promise(resolve => {
    if (!isStringNotEmpty(mailId)) {
      if (__DEV__) {
        console.log('error while sending mail reason --- empty mail id');
      }
      return resolve(false);
    }
    try {
      Linking.openURL(
        'mailto:' + mailId + '?subject=' + subject + '&body=' + message,
      )
        .then(() => {
          return resolve(true);
        })
        .catch(er => {
          if (__DEV__) {
            console.log('error while sending mail reason ---,', er);
          }
          return resolve(false);
        });
    } catch (ex) {
      if (__DEV__) {
        console.log('error while sending mail reason ---,', ex);
      }
      return resolve(false);
    }
  });
};
const openLinkUrl = (url = '') => {
  return new Promise(resolve => {
    if (!isStringNotEmpty(url)) {
      if (__DEV__) {
        console.log('error while sending mail reason --- empty mail id');
      }
      return resolve(false);
    }
    try {
      Linking.openURL(url?.toString()?.trim())
        .then(() => {
          return resolve(true);
        })
        .catch(er => {
          if (__DEV__) {
            console.log('error while opening link reason ---,', er);
          }
          return resolve(false);
        });
    } catch (ex) {
      if (__DEV__) {
        console.log('eerror while opening link reason  ---,', ex);
      }
      return resolve(false);
    }
  });
};
const openShareBox = async (message = '') => {
  try {
    const result = await Share.share({
      message: message,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      showPopupMessage({type: 'info', message: 'You cancelled sharing'});
    }
  } catch (error) {
    showPopupMessage({
      type: 'info',
      message: 'Oops! something went wrong, please try again',
    });
  }
};
const sendSms = (phoneNumber = '') => {
  return new Promise(resolve => {
    if (!isStringNotEmpty(phoneNumber)) {
      if (__DEV__) {
        console.log(
          'error while sending message reason --- empty phoneNumber id',
        );
      }
      return resolve(false);
    }
    try {
      Linking.openURL('sms:' + phoneNumber)
        .then(() => {
          return resolve(true);
        })
        .catch(er => {
          if (__DEV__) {
            console.log('error while sending SMS reason ---,', er);
          }
          return resolve(false);
        });
    } catch (ex) {
      if (__DEV__) {
        console.log('error while sending SMS reason ---,', ex);
      }
      return resolve(false);
    }
  });
};

export {
  openShareBox,
  sendWhatsUpMessage,
  connectToCall,
  sendEmail,
  openLinkUrl,
  sendSms,
};
