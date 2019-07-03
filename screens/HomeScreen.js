import s from '../styles/styles'
import React, { Component } from "react";
import Navigation from "react-navigation"
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar
} from "react-native";
import { Header } from 'react-native-elements'
//import { Header, Left, Right, Icon } from 'native-base'

export default class HomeScreen extends Component {

    constructor(props){
        super(props);
    }
    
    
    render() {

        return (
            <View style={[s.global, styles.container] }>  
                <Header
                    // backgroundColor='white'   
                    statusBarProps={{ backgroundColor: 'red', barStyle:'light-content'}}

                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'BarHop', style: { color: '#fff', fontSize: 25 } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                    containerStyle={{
                        backgroundColor: 'gray',
                        justifyContent: 'space-around',
                      }}
                />
                {/* <Header style={{backgroundColor:'white'}}> 
                    <Left>
                        <Icon name="menu" onPress={() => {this.props.navigation.openDrawer()}}/>  
                    </Left>
                </Header>   */}
                {/* <Header style={{backgroundColor:'white'}}>
                    <Left>
                        <Icon name="menu" onPress={() => {this.props.navigation.openDrawer()}}/>  
                    </Left>
                </Header>   */}
                <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                    <Text>
                        HomeScreen
                    </Text>   
                </View>  
                {/* <StatusBar backgroundColor="red" barStyle="dark-content"/>    */}
                {/* <StatusBar backgroundColor="red" />    */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
        //,paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
    }
});