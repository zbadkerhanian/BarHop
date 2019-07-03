import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  global: {
    flex: 1
    , backgroundColor: "black"
    //paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
  }
});