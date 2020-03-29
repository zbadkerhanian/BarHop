import * as React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'
import LocationInfoScreen from './src/screens/LocationInfoScreen'
import AccountScreen from './src/screens/AccountScreen'
import FriendsListScreen from './src/screens/FriendsListScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import NotificationsScreen from './src/screens/NotificationsScreen'
import PrivacyScreen from './src/screens/PrivacyScreen'
import SecurityScreen from './src/screens/SecurityScreen'
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';


export default function App() {
  return (
    <NavigationContainer>
      <Drawer></Drawer>
    </NavigationContainer>
  );
}


const DrawerNav = createDrawerNavigator();

function Drawer() {
  return(
    <DrawerNav.Navigator 
      initialRouteName = "Home"
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


const HomeStackNav = createStackNavigator();

function HomeStack() {
  return (
    <HomeStackNav.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <HomeStackNav.Screen name="Home" component={HomeScreen} />
      <HomeStackNav.Screen name="Login" component={Login} />
      <HomeStackNav.Screen name="Signup" component={Signup} />
      <HomeStackNav.Screen name="LocationInfo" component={LocationInfoScreen} />
    </HomeStackNav.Navigator>
  );
}


const AccountStackNav = createStackNavigator();

function AccountStack() {
  return (
    <AccountStackNav.Navigator
      initialRouteName="Account"
      screenOptions={{headerShown: false}}>
      <AccountStackNav.Screen name="Account" component={AccountScreen} />
      <AccountStackNav.Screen name="Friends" component={FriendsListScreen} />
    </AccountStackNav.Navigator>
  );
}


const SettingsStackNav = createStackNavigator();

function SettingsStack() {
  return (
    <SettingsStackNav.Navigator
      initialRouteName="Settings"
      screenOptions={{headerShown: false}}>
      <SettingsStackNav.Screen name="Settings" component={SettingsScreen}/>
      <SettingsStackNav.Screen name="Notifications" component={NotificationsScreen} />
      <SettingsStackNav.Screen name="Privacy" component={PrivacyScreen} />
      <SettingsStackNav.Screen name="Security" component={SecurityScreen} />
    </SettingsStackNav.Navigator>
  );
}
