import s from '../styles/global'
import React, { Component } from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity, TextInput} from 'react-native';
import { Header, Icon } from 'react-native-elements';
import {Utilities} from '../global_functions/Utilities';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//Screen width and height
var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height; 

export default class HomeScreen extends Component {

    

    constructor(props){
        super(props);
        this.state = {
            ready: false,
            //where: {
                lat: 0,
                lng: 0,
            //},
            error: null
        }
    }
    componentDidMount(){
        let geoOptions={
            enableHighAccuracy:true,
         };
        this.setState({ready:false})
        navigator.geolocation.watchPosition(this.geoSuccess,this.geoFailure,geoOptions);
    }
    geoFailure=(err)=>{
        console.log(err);
    }
    geoSuccess = (position) => {
        this.setState({ready: true});
        this.setState({
            ready: true,
            // where: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            // }
        })
    }
    test(){
        console.log("hit test");
        navigator.geolocation.watchPosition(this.geoSuccess,this.geoFailure,this.geoOptions);
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
                                <View style={{flex:1, flexDirection:'row', padding: 10, marginVertical: 10, backgroundColor: '#202020'}}>
                                    <Icon name='search' color='#fff' style={{marginRight: 10}}/>
                                    <TextInput placeholder='Search' style={{color: '#fff', flex:1}}/>
                                </View>
                            }
                            rightComponent={{
                                icon: 'search', 
                                color: '#C2185B' 
                            }}
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
                    <GooglePlacesAutocomplete
                        placeholder = 'Search'
                        minLength   = {2}       // minimum length of text to search
                        autoFocus
                        returnKeyType     = {'search'}  // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed = 'auto'      // true/false/undefined
                        fetchDetails= {true}
                        // renderDescription={(row) => row.description} // custom description render
                        onPress = {(details = null) => { // 'details' is provided when fetchDetails = true
                            
                            console.log(details);
                            

                        }}
                        textInputProps={{
                            onChangeText: (location) => this.setState({ location })
                        }}
                        getDefaultValue={() => {
                            return '' // text input default value
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key     : 'AIzaSyAJmqXbU1t40tXd6Qhaul_yiWhzhfoazG8',
                            language: 'en',                                        // language of the results
                            types   : '(cities)'                                   // default: 'geocode'
                        }}
                        styles={{
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                            color: '#1faadb'
                            },
                            listView: {                           
                                backgroundColor: 'white',
                                text           : 'white'
                            },
                        }}

                        currentLocation // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel        = 'Current location'
                        nearbyPlacesAPI             = 'GooglePlacesSearch'  // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery = {{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types : "night_club"
                        }}

                        filterReverseGeocodingByTypes = {['locality', 'administrative_area_level_3']}  // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        enablePoweredByContainer      = {false}
                        debounce                      = {200}                                          // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        />
                        <MapView
                            showsUserLocation={true}
                            initialRegion={{
                                latitude: this.state.lat,
                                longitude: this.state.lng,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={{width: width, height:300, marginVertical: 20}}
                        />
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
                                Latitude: {this.state.lat}
                                {'\n'}
                                Longitude: {this.state.lng}
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
        //height: 1000
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});
