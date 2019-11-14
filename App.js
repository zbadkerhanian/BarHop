import React from "react"
import { StyleSheet, Text, View, Image, Button, SafeAreaView, ScrollView, Dimensions, Platform, AsyncStorage} from 'react-native'
import {createDrawerNavigator, createAppContainer, DrawerItems} from 'react-navigation'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'

import * as Expo from "expo"
import Constants from 'expo-constants'



export default class App extends React.Component {
  

  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      // signedIn: (AsyncStorage.getItem("accessToken")) ? true : false,
      name: global.name,
      photoUrl: global.photoUrl
    }

    // if(window.sessionStorage.getItem("idToken")){
    //   this.setState({
    //     signedIn: true
    //   })
    // }
  }
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "932994329359-lbujjkguojmkng477mk5o3nhki4vp19r.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        console.log("accessToken: " + result.accessToken);
        console.log("idToken: " + result.idToken);
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        });

        fetch('http://barhopapi-env.sesiektkrm.us-west-1.elasticbeanstalk.com/api/Users/postUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idToken: result.accessToken,
                firstName: result.user.givenName,
                lastName: result.user.familyName,
                email: result.user.email
            }),
        })
        .then((response) => response.json()).then((result)=> console.log(result));


        // window.localStorage.setItem("idToken", result.idToken);

        try {
          // await AsyncStorage.setItem('idToken', result.idToken);
          await AsyncStorage.setItem('accessToken', result.accessToken);
        } catch (error) {
          // Error saving data
          console.log("error saving: " + error);
        }

        

        global.name = result.user.name;
        global.photoUrl = result.user.photoUrl;
      } 
      else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  }
  render() {
    return (
      // <View style={loginStyles.container}>
      <View style={{flex: 1}}>
        {this.state.signedIn ? (
          // <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
          <AppContainer />
        ) : (
          <View style={loginStyles.container}>
            <LoginPage signIn={this.signIn} />
          </View>
        )}
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={loginStyles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.header}>Welcome:{props.name}</Text>
      <Image style={loginStyles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})

// COOL COLOR    "#C2185B"
const CustomDrawerComponent = (props) => (
  <SafeAreaView>
    <View style={{ backgroundColor: "#202020", height: Constants.statusBarHeight}}/>
    <View style={{ backgroundColor:'#282828', height: 150, alignItems:'center', justifyContent:'center'}}>
      <View style={{alignItems:'center', justifyContent:'center', borderRadius:60,height:120,width:120, overflow:"hidden"}}>
        {/* <Image source={require('./assets/profile-photo.jpg')} style={{ height: 160, width: 160 }}/> */}
        <Image source={{ uri: global.photoUrl }} style={{ height: 160, width: 160 }}/>
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
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
  },
});
