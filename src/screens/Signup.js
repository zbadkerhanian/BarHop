import s from '../styles/global';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import Logo from '../components/Logo';

import { Header, Icon } from 'react-native-elements'

export default class Signup extends Component {

  alph=/^[a-zA-Z].{2,50}$/
  pass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  emailAdd=/^.+\@.+\..+$/

  constructor(props) {
    super(props)
    this.state={
      firstName:'',
      firstNameValidated:true,
      lastName:'',
      lastNameValidated:true,
      email:'',
      emailValidated:true,
      password:'',
      passwordValidated:true
    }
  }

  validate(text,type)
  {
    switch(type){
      case 'firstName':
        this.setState({
          firstNameValidated: (this.alph.test(text)) ? true : false
        })
        break;
      case 'lastName':
        this.setState({
          lastNameValidated: (this.alph.test(text)) ? true : false
        })
        break;
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
          <TextInput style={[styles.inputBox, !this.state.firstNameValidated? styles.error:null]}
            onChangeText={(text)=>this.validate(text,'firstName')}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="First Name"
            placeholderTextColor = "#ffffff"
            errorMessages={['This field is required']}
            selectionColor="#fff"
            onSubmitEditing={()=> this.lastName.focus()}
          />
          <TextInput style={[styles.inputBox, !this.state.lastNameValidated? styles.error:null]}
            onChangeText={(text)=>this.validate(text,'lastName')}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Last Name"
            placeholderTextColor = "#ffffff"
            errorMessages={['This field is required']}
            selectionColor="#fff"
            ref={(input) => this.lastName = input}
            onSubmitEditing={()=> this.email.focus()}
          />
          <TextInput style={[styles.inputBox, !this.state.emailValidated? styles.error:null]}
            onChangeText={(text)=>this.validate(text,'email')}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            placeholderTextColor = "#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            ref={(input) => this.email = input}
            onSubmitEditing={()=> this.password.focus()}
          />
          <TextInput style={[styles.inputBox, !this.state.passwordValidated? styles.error:null]}
            onChangeText={(text)=>this.validate(text,'password')}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor = "#ffffff"
            ref={(input) => this.password = input}
          />
           <TouchableOpacity style={styles.button} >
             <Text style={styles.buttonText}>Signup</Text>
           </TouchableOpacity>
  		  </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.signupButton}> Sign in</Text>
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
  error:{
    borderWidth:3,
    borderColor: 'red'
  }
});