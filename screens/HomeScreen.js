import s from '../styles/styles'
import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    TextInput
} from 'react-native';
//import { Header, Icon } from 'react-native-elements';
import { Header, Icon } from '../react-native-elements';

import {Utilities} from '../global_functions/Utilities';

import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';


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
        //console.log(position);
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

                <CollapsibleHeaderScrollView
                    CollapsibleHeaderComponent={
                        <Header
                            statusBarProps={{ 
                                backgroundColor: '#202020', 
                                translucent: true, 
                                barStyle: 'light-content'
                            }}

                            leftComponent={{ 
                                icon: 'menu',
                                color: '#C2185B', 
                                underlayColor: '#282828',
                                onPress: this.props.navigation.openDrawer
                            }}

                            // centerComponent={{ 
                            //     text: 'BarHop', 
                            //     style: { 
                            //         color: '#C2185B', 
                            //         fontSize: 25 
                            //     } 
                            // }}
                            centerComponent={
                                <View style={{flex:1, flexDirection:'row', paddingHorizontal:10, marginVertical: 10, backgroundColor: '#202020'}}>
                                    <Icon name='search' color='#C2185B' containerStyle={{paddingTop: 5.15, marginRight: 10}}/>
                                    <TextInput 
                                        placeholder='Search' 
                                        style={{
                                            color: '#fff', 
                                            flex:1, 
                                            lineHeight: 35
                                        }}
                                        returnKeyType='go'
                                        onSubmitEditing={() => {console.log('searched something');}}
                                        />
                                </View>
                            }
                            // rightComponent={{
                            //     icon: 'search', 
                            //     color: '#C2185B' 
                            // }}
                            containerStyle={{
                                backgroundColor: '#282828',
                                borderBottomColor: '#282828', 
                                borderBottomWidth: 1 
                            }}
                            
                        />
                    }
                    headerHeight={80}
                    statusBarHeight={Platform.OS === 'ios' ? 20 : 0}
                    disableHeaderSnap={true}
                >
                
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {this.test()}}><Text style={{paddingBottom: 40, color:'#ffffff', fontSize: 20}}>TEST</Text></TouchableOpacity>

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
                </CollapsibleHeaderScrollView>
                
                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center', 
        justifyContent:'center',
        height: 1000
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});