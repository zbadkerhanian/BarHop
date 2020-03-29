import s from '../styles/global';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Header, Icon } from 'react-native-elements'

import Logo from '../components/Logo';


export default class Login extends Component {

  pass=/^.{6,20}$/
  emailAdd=/^.+\@.+\..+$/

  constructor(props) {
    super(props)
    this.state={
      email:'',
      emailValidated:true,
      password:'',
      passwordValidated:true
    }
  }

  validate(text,type)
  {
    switch(type){
      case 'password':
        this.setState({
          passwordValidated: (this.pass.test(text)) ? true : false
        })
        break;
      case 'email':
        this.setState({
          emailValidated: (this.emailAdd.test(text)) ? true : false
        })
        break;
    }
  }

  render(){
    state={
      switchNotifications:false
  }
    return(
      <View style={[s.global, styles.container1]}>
                <Header
                    statusBarProps={{ 
                        backgroundColor:'#202020', 
                        translucent:true, 
                        barStyle:'light-content'
                    }}
                    leftComponent={{ 
                        icon: 'chevron-left',
                        color: '#C2185B', 
                        underlayColor: '#282828',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    // centerComponent={{ 
                    //     text: 'BarHop', 
                    //     style: { 
                    //         color: '#C2185B', 
                    //         fontSize: 25 
                    //     } 
                    // }}
                    containerStyle={{
                        height: 80,
                        backgroundColor: '#282828',
                        borderBottomColor:'#282828', 
                        borderBottomWidth:1 
                      }}
                    
                />
      <View style={styles.container}>
          <Logo/>
        <View style={styles.container}>
          <TextInput style={[styles.inputBox, !this.state.emailValidated? styles.error:null]}
            autoCompleteType='email' 
            textContentType='emailAddress'
            onChangeText={(text)=>this.validate(text,'email')}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            placeholderTextColor = "#ffffff"
            errorMessages={['This field is required']}
            returnKeyType='next'
            keyboardType="email-address"
            onSubmitEditing={()=> this.password.focus()}
          />
          <TextInput style={[styles.inputBox, !this.state.passwordValidated? styles.error:null]}
            onChangeText={(text)=>this.validate(text,'password')}
            textContentType='password'
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor = "#ffffff"
            errorMessages={['This field is required']}
            returnKeyType='go'
            ref={(input) => this.password = input}
          />
          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
  		  </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container1:{
    flex: 1
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#455a64",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'center',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },
  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.3)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10,
    paddingVertical: 14
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  error: {
    borderWidth:3,
    borderColor: 'red'
  }
});