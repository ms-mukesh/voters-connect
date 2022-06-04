import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
interface AppScrollViewType {
  children?: any;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  contentContainerStyle?: any;
  keyboardShouldPersistTaps?: any;
  nestedScrollEnabled?: boolean;
}
const AppScrollView = (props: AppScrollViewType) => {
  const {
    children = null,
    showsVerticalScrollIndicator = false,
    showsHorizontalScrollIndicator = false,
    contentContainerStyle = null,
    keyboardShouldPersistTaps = 'handled',
    nestedScrollEnabled = true,
  } = props;
  return (
    <ScrollView
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      contentContainerStyle={[
        styles.contentContainerStyle,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      nestedScrollEnabled={nestedScrollEnabled}>
      {children}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  contentContainerStyle: {
    // flex:1,
    height: '100%',
    width: '100%',
  },
});
export default AppScrollView;
