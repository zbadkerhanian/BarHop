import s from '../styles/global'

import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
//Screen width and height
var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height; 
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList
} from 'react-native';
import { Header, Icon } from '../react-native-elements';
import {Utilities} from '../global_functions/Utilities';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

const LocationInfo = [
    {
      name: 'Bar1',
      rating:'1',
      cost:"$",
      distance:'1.1',

    },
    {
      name: 'Bar2',
      rating:'2',
      cost:'$$',
      distance:'1.2',
    },
    {
        name: 'Bar3',
        rating:'3',
        cost:'$$$',
        distance:'1.3',  
    },
  ];

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            ready: false,
            lat: null,
            lng: null,
            error: null,
            name: props.name,
            photoUrl: props.photoUrl
        }
        _utilities = new Utilities();


        let geoOptions={
            enableHighAccuracy:true,
        };
        navigator.geolocation.watchPosition(this.geoSuccess,this.geoFailure,geoOptions);

    }
    componentDidMount(){
        // let geoOptions={
        //     enableHighAccuracy:true,
        // };
        this.setState({ready:false})
        // navigator.geolocation.watchPosition(this.geoSuccess,this.geoFailure,geoOptions);
        this.setState({ready: false, error: null});
        _utilities.getUserLocation(this.geoSuccess);
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
        this.setState({
            ready: true,
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }
    
    getGeo(){
        console.log('run test'); 
        _utilities.getUserLocation(this.geoSuccess);
        fetch('http://Barhopapi-env.sesiektkrm.us-west-1.elasticbeanstalk.com/api/Test/postGeo', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lat: this.state.lat,
                lng: this.state.lng,
            }),
        })
        .then((response) => response.json()).then((result)=> console.log(result));
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
                <View>
                    <FlatList
                    data={LocationInfo}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Settings')}
                >
                    <View style={{flex: 1, flexDirection: 'column',marginVertical:5}}>
                        <View style={{flex:1,backgroundColor: 'blue'}}>
                            <Text style={styles.text}>{item.name}</Text>
                        </View> 
                        <View >
                            <Image source={require('./../assets/bar-stock.jpg')} 
                            style={{ height: 100, width: width }}/>
                        </View> 
                        <View style={{flex: 1,flexDirection:'row'}}>
                            <View style={{flex:1,flexDirection:'column',backgroundColor: 'lightblue'}}>
                                <Text style={styles.text}>{item.rating}</Text>
                            </View>
                            <View style={{flex:1,flexDirection:'column',backgroundColor: 'steelblue'}}>
                                <Text style={styles.text}>{item.cost}</Text>
                            </View>
                            <View style={{flex:1,flexDirection:'column',backgroundColor: 'blue'}}>
                                <Text style={styles.text}>{item.distance}</Text>
                            </View>   
                        </View> 
                    </View>
                </TouchableOpacity>
                    }
                    keyExtractor={item => item.name}
                    />
                </View>
                
                
                <View style={styles.container}>
                    {/* <View style={styles.container}> */}
                        {/* <Text style={loginStyles.header}>Welcome:{props.name}</Text>
                        <Image style={loginStyles.image} source={{ uri: props.photoUrl }} /> */}
                        <Text style={styles.text}>Welcome: {global.name}</Text>
                        {/* <Image style={loginStyles.image} source={{ uri: global.photoUrl }} /> */}
                    {/* </View> */}
                    <TouchableOpacity onPress={() => {this.getGeo(); console.log('new state is .. '); console.log(this.state.lat); console.log(this.state.lng)}}><Text style={{paddingBottom: 40, color:'#C2185B', fontSize: 20}}>TEST</Text></TouchableOpacity>

                    { !this.state.ready && (
                        //when ready is false
                        <Text style={styles.text}>
                            Could not access location.
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
        height: 500
    },
    text: {
        color: 'white',
        fontSize: 20,
        margin: 5
    },
});

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
    },
    flatview: {
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
    },
    text: {
        color: 'white',
        fontSize: 20,
        margin: 5
    }
});
