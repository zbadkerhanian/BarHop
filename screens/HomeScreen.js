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

export default class HomeScreen extends Component {

    constructor(props){
        super(props);
    }
    
    
    render() {

        return (
            <View style={[s.global, styles.container] }>  
                <Header
                     //backgroundColor='#282828'   
                    statusBarProps={{ 
                        backgroundColor:'#202020', 
                        translucent:true, 
                        barStyle:'light-content'
                    }}

                    //leftComponent={{ icon: 'menu', color: '#fff' }}
                    //leftComponent={ <Icon name="menu" color='#fff' underlayColor='#282828' onPress={() => {this.props.navigation.openDrawer()}}/>}
                    leftComponent={{ 
                        icon: "menu",
                        color:'#fff', 
                        underlayColor:'#282828',
                        onPress: this.props.navigation.openDrawer
                    }}
                    centerComponent={{ 
                        text: 'BarHop', 
                        style: { 
                            color: '#fff', 
                            fontSize: 25 
                        } 
                    }}
                    //rightComponent={<Icon name="home" color='#fff' />}
                    containerStyle={{
                        backgroundColor: '#282828',
                        borderBottomColor:'#282828', 
                        borderBottomWidth:1 
                      }}
                    
                />
                <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{color: 'white'}}>
                        HomeScreen
                    </Text>   
                </View>  
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});