import s from '../styles/global';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import Logo from '../components/Logo';

import { Header, Icon } from 'react-native-elements'

export default class Signup extends Component {
  validated;
  alph=/^[a-zA-Z].{2,50}$/
  pass=/^.{6,20}$/;
  //pass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  emailAdd=/^.+\@.+\..+$/
  errors=[];

  constructor(props) {
    super(props)
    this.state={
      firstName:'',
      firstNameValidated:true,
      lastName:'',
      lastNameValidated:true,
      username:'',
      usernameValidated:true,
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
          firstName: text,
          firstNameValidated: (this.alph.test(text)) ? true : false
        })
        break;
      case 'lastName':
        this.setState({
          lastName: text,
          lastNameValidated: (this.alph.test(text)) ? true : false
        })
        break;
      case 'username':
        this.setState({
          username: text,
          usernameValidated: (this.alph.test(text)) ? true : false
        })
        break;
      case 'email':
        this.setState({
          email: text,
          emailValidated: (this.emailAdd.test(text)) ? true : false
        })
        break;
      case 'password':
        this.setState({
          password: text,
          passwordValidated: (this.pass.test(text)) ? true : false
        })
        break;
    }
  }

  submit(){
    console.log("SUBMIT")
    let ready = true;
    if(this.state.firstName.length == 0){
      ready = false;
      this.errors.push("First Name cannot be empty.")
    }
    if(!this.state.firstNameValidated){
      ready = false;
      this.errors.push("Enter a valid First Name.")
    }
    if(this.state.lastName.length == 0){
      ready = false;
      this.errors.push("Last Name cannot be empty.")
    }
    if(!this.state.lastNameValidated){
      ready = false;
      this.errors.push("Enter a valid Last Name.")
    }
    if(this.state.username.length == 0){
      ready = false;
      this.errors.push("Username cannot be empty.")
    }
    if(!this.state.usernameValidated){
      ready = false;
      this.errors.push("Username must consist of letters only.")
    }
    if(this.state.email.length == 0){
      ready = false;
      this.errors.push("Email cannot be empty.")
    }
    if(!this.state.emailValidated){
      ready = false;
      this.errors.push("Enter a valid email address.")
    }
    if(this.state.password == 0){
      ready = false;
      this.errors.push("Password cannot be empty.")
    }
    if(!this.state.passwordValidated){
      ready = false;
      this.errors.push("Password must be at least 6 characters.")
    }
    this.displayErrors();
    if(ready){
      console.log("send to api");
    }
  }

  displayErrors(){
    if(this.errors.length != 0)
      Alert.alert('', this.errors.join('\n'));
    this.errors=[];
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
              autoCompleteType='name' 
              textContentType='givenName'
              onChangeText={(text)=>this.validate(text,'firstName')}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="First Name"
              placeholderTextColor = "#ffffff"
              errorMessages={['This field is required']}
              returnKeyType='next'
              //selectionColor="#fff"
              onSubmitEditing={()=> this.lastName.focus()}
            />
            <TextInput style={[styles.inputBox, !this.state.lastNameValidated? styles.error:null]}
              autoCompleteType='name' 
              textContentType='familyName'
              onChangeText={(text)=>this.validate(text,'lastName')}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Last Name"
              placeholderTextColor = "#ffffff"
              errorMessages={['This field is required']}
              returnKeyType='next'
              ref={(input) => this.lastName = input}
              onSubmitEditing={()=> this.username.focus()}
            />
            <TextInput style={[styles.inputBox, !this.state.usernameValidated? styles.error:null]}
              autoCompleteType='username' 
              textContentType='username'
              onChangeText={(text)=>this.validate(text,'username')}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Username"
              placeholderTextColor = "#ffffff"
              errorMessages={['This field is required']}
              returnKeyType='next'
              ref={(input) => this.username = input}
              onSubmitEditing={()=> this.email.focus()}
            />
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
              ref={(input) => this.email = input}
              onSubmitEditing={()=> this.password.focus()}
            />
            <TextInput style={[styles.inputBox, !this.state.passwordValidated? styles.error:null]}
              autoCompleteType='password' 
              textContentType='newPassword'
              onChangeText={(text)=>this.validate(text,'password')}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#ffffff"
              errorMessages={['This field is required']}
              returnKeyType='go'
              ref={(input) => this.password = input}
            />
            <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
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
    paddingVertical: 10
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