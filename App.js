import s from './styles/global'
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image, Platform, StatusBar } from 'react-native'
import {createDrawerNavigator, createAppContainer, DrawerItems} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'

export default class App extends React.Component {
  render(){
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
      <Image source={require('./assets/profile-photo.jpg')} style={{ height: 80, width: 80, borderRadius:60 }}/>
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
