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
        this.state = {
            ready: false,
            where: {
                lat: null,
                lng: null
            },
            error: null
        }
    }

    componentDidMount(){
        let geoOptions = {
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 60 * 60 * 24
        };
        this.setState({ready: false, error: null});
        navigator.geolocation.getCurrentPosition(
            this.geoSuccess,
            this.geoFailure,
            geoOptions
        );
    }

    // geoSuccess(position){
    //     this.setState({ready: true})
    // }

    geoSuccess = (position) => {
        this.setState({ready: true});
        this.setState({
            ready: true,
            where: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        })
    }

    // geoFailure(err){
    //     this.setState({error: err.message});
    // }

    geoFailure = (err) => {
        this.setState({error: err.message});
    }
    
    
    render() {

        return (
            <View style={[s.global, styles.container] }>  
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
                <View style={styles.container}>
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
                        <Text style = {styles.text}>
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
        justifyContent:'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});