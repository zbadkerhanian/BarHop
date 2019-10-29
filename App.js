import s from './styles/styles'
import * as Permissions from 'expo-permissions';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image, Platform, StatusBar } from 'react-native'
import {createDrawerNavigator, createAppContainer, DrawerItems} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'

import {PermissionsAndroid} from 'react-native';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class App extends React.Component {
  render(){
    //console.log(Permissions.getAsync(LOCATION));
    requestCameraPermission();
    return (
      <View style={{flex: 1}}> 
        <AppContainer />
      </View>
        
    );
  }  
}

// COOL COLOR    "#C2185B"
const CustomDrawerComponent = (props) => (
  <SafeAreaView>
    <View style={{ backgroundColor: "#202020", height: Expo.Constants.statusBarHeight}}/>
    <View style={{ backgroundColor:'#282828', height: 150, alignItems:'center', justifyContent:'center'}}>
      <View style={{alignItems:'center', justifyContent:'center', borderRadius:60,height:120,width:120, overflow:"hidden"}}>
        <Image source={require('./assets/profile-photo.jpg')} style={{ height: 160, width: 160 }}/>
      </View>
    </View>
    <ScrollView style={{backgroundColor:'#282828',height:Dimensions.get('window').height}}>
      <DrawerItems {...props} />
    </ScrollView>
    {/* <StatusBar backgroundColor="white" barStyle="dark-content"/> */}
  </SafeAreaView>  
)

const AppDrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
  },{
    contentComponent: CustomDrawerComponent,
    
    contentOptions: {

      labelStyle:{
        color: '#ffffff'
      },
      
      activeLabelStyle:{
        color: '#C2185B'
      }
      
    }
  }
)

const AppContainer = createAppContainer(AppDrawerNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
  },
});
