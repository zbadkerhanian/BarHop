import s from '../styles/styles'
import React, { Component } from "react";
import Navigation from "react-navigation";
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity,
    TextInput
} from "react-native";
import { Header, Icon } from 'react-native-elements';
import {Utilities} from '../global_functions/Utilities'

export default class HomeScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            ready: false,
            where: {
                lat: null,
                lng: null
            },
            error: null
        }
        _utilities = new Utilities();
    }

    componentDidMount(){
        
        this.setState({ready: false, error: null});
        _utilities.getUserLocation(this.geoSuccess);
    }

    geoSuccess = (position) => {
        console.log(position);
        this.setState({ready: true});
        this.setState({
            ready: true,
            where: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        })
    }
    
    test(){
        _utilities.getUserLocation(this.geoSuccess);
    }
    
    render() {

        return (
            <View style={s.global}>  
                <Header
                    statusBarProps={{ 
                        backgroundColor:'#202020', 
                        translucent:true, 
                        barStyle:'light-content'
                    }}

                    leftComponent={{ 
                        icon: "menu",
                        color:'#C2185B', 
                        underlayColor:'#282828',
                        onPress: this.props.navigation.openDrawer
                    }}
                    centerComponent={{ 
                        text: 'BarHop', 
                        style: { 
                            color: '#C2185B', 
                            fontSize: 25 
                        } 
                    }}
                    rightComponent={{
                        icon:'search', 
                        color:'#C2185B' 
                    }}
                    containerStyle={{
                        backgroundColor: '#282828',
                        borderBottomColor:'#282828', 
                        borderBottomWidth:1 
                      }}
                    
                />
                <View style={{flexDirection: 'row', padding: 10, margin: 10, backgroundColor: '#282828'}}>
                    <Icon name='search' color='#fff' style={{marginRight: 10}}/>
                    <TextInput placeholder='Search' style={{color: '#fff'}}/>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {this.test()}}><Text style={{paddingBottom: 40, color:"#ffffff", fontSize: 20}}>TEST</Text></TouchableOpacity>

                    { !this.state.ready && (
                        //when ready is false
                        <Text style={styles.text}>
                            Geolocation in React Native
                        </Text>
                    )}
                    { this.state.error && (
                        <Text style={styles.text}>
                            {this.state.error}                        
                        </Text>
                    )}
                    { this.state.ready && ( 
                        <Text style={styles.text}>
                            Latitude: {this.state.where.lat}
                            {'\n'}
                            Longitude: {this.state.where.lng}
                        </Text>
                    )}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        paddingTop: 150
        //, justifyContent:'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});