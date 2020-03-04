import * as React from 'react';
import { View, Image, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import LocationInfoScreen from './screens/LocationInfoScreen'
import AccountScreen from './screens/AccountScreen'
import FriendsListScreen from './screens/FriendsListScreen'
import SettingsScreen from './screens/SettingsScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import PrivacyScreen from './screens/PrivacyScreen'
import SecurityScreen from './screens/SecurityScreen'
import Constants from 'expo-constants'

const StackNav = createStackNavigator();

function HomeStack() {
  return (
    <StackNav.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="Home" component={HomeScreen} />
      <StackNav.Screen name="LocationInfo" component={LocationInfoScreen} />
    </StackNav.Navigator>
  );
}

function AccountStack() {
  return (
    <StackNav.Navigator
      initialRouteName="Account"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="Account" component={AccountScreen} />
      <StackNav.Screen name="Friends" component={FriendsListScreen} />
    </StackNav.Navigator>
  );
}

function SettingsStack() {
  return (
    <StackNav.Navigator
      initialRouteName="Settings"
      screenOptions={{headerShown: false}}>
      <StackNav.Screen name="Settings" component={SettingsScreen}/>
      <StackNav.Screen name="Notifications" component={NotificationsScreen} />
      <StackNav.Screen name="Privacy" component={PrivacyScreen} />
      <StackNav.Screen name="Security" component={SecurityScreen} />
    </StackNav.Navigator>
  );
}

const DrawerNav = createDrawerNavigator();

function Drawer() {
  return(
    <DrawerNav.Navigator 
      initialRouteName = 'home'
      drawerContent={props => <CustomDrawerContent {...props}/>} 
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor: 'white',
      }}>
      <DrawerNav.Screen name="Home" component={HomeStack} />
      <DrawerNav.Screen name="Account" component={AccountStack} />
      <DrawerNav.Screen name="Settings" component={SettingsStack} />
    </DrawerNav.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Drawer></Drawer>
    </NavigationContainer>
  );
}

export default App;


const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props} style={{backgroundColor:'#282828',height:Dimensions.get('window').height}}>
      <View style={{height: 150, alignItems:'center', justifyContent:'center'}}>
        <View style={{alignItems:'center', justifyContent:'center', borderRadius:60,height:120,width:120, overflow:"hidden"}}>
          <Image source={require('./assets/profile-photo.jpg')} style={{ height: 160, width: 160 }}/>
          {/* <Image source={{ uri: global.photoUrl }} style={{ height: 160, width: 160 }}/> */}
        </View>
      </View>
    <DrawerItemList {...props}/>
  </DrawerContentScrollView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
