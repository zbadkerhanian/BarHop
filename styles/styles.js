import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  global: {
    flex: 1
    //paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
  }
});