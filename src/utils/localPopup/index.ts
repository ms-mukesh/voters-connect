import Toast from 'react-native-toast-message';

export const showPopupMessage = ({
  message = 'Something went wrong',
  title = 'Voters Connect',
  type = 'success',
  position = 'top',
  visibilityTime = 3000,
  autoHide = true,
  topOffset = 40,
  bottomOffset = 40,
  onPress,
  onShow,
  onHide,
}: {
  message?: string;
  title?: string;
  type?: 'success' | 'error' | 'info';
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
}) => {
  Toast.show({
    type,
    position: position,
    text1: title,
    text2: message,
    visibilityTime: visibilityTime,
    autoHide: autoHide,
    topOffset: topOffset,
    bottomOffset: bottomOffset,
    onShow: onShow,
    onHide: onHide,
    onPress: onPress,
  });
};
