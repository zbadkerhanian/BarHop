import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import {createDrawerNavigator, createAppContainer, DrawerItems} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'

export default class App extends React.Component {
  render(){
    return (
      <AppContainer/>
    );
  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 150, backgroundColor:'white', alignItems:'center', justifyContent:'center' }}>
      <Image source={require('./assets/user-icon.png')} style={{ height: 80,width: 80, borderRadius:60 }}/>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
},{
  contentComponent: CustomDrawerComponent
})

const AppContainer = createAppContainer(AppDrawerNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
