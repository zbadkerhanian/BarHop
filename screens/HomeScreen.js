import s from '../styles/global'
import React, { Component } from 'react';
import MapView from 'react-native-maps';
//import { Dimensions } from 'react-native';
//Screen width and height
//var width = Dimensions.get('window').width; 
//var height = Dimensions.get('window').height; 
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    ScrollView,
    Image,
    Dimensions
} from 'react-native';
import { Header, Icon } from '../react-native-elements';
import {Utilities} from '../global_functions/Utilities';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

const { height, width } = Dimensions.get('window')
import StarRating from 'react-native-star-rating'

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
                                barStyle: 'dark-content'
                            }}

                            leftComponent={{ 
                                icon: 'menu',
                                color: '#C2185B', 
                                underlayColor: '#282828',
                                onPress: this.props.navigation.openDrawer
                            }}

                            centerComponent={
                                <View style={{flex:1, flexDirection:'row', paddingHorizontal:10, marginVertical: 8, backgroundColor: '#202020'}}>
                                    <Icon name='search' color='#C2185B' containerStyle={{paddingTop: 1, marginRight: 10}}/>
                                    <TextInput 
                                        placeholder='Search' 
                                        style={{
                                            color: '#fff', 
                                            flex:1, 
                                            lineHeight: 20
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

                
                    <SafeAreaView>
                        <ScrollView scrollEventThrottle={16}>
                            <View>
                                <Text style={styles.text}>
                                    What can we help you find?
                                </Text>

                                <View style={{height: 130, marginTop: 20, marginBottom: 30}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <View style={{height: 130, width: 130, marginLeft: 20,
                                            borderWidth: 0.5, borderColor: '#dddddd' }}>
                                            <View style={{ flex: 2}}>
                                                <Image source={require('../assets/a.jpg')}
                                                    style={{ flex: 1, width: null, height: null, 
                                                    resizeMode: 'cover'}}
                                                    />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                                <Text style={{ color: 'white' }}>Home</Text>
                                            </View>
                                        </View>

                                        <View style={{height: 130, width: 130, marginLeft: 20,
                                            borderWidth: 0.5, borderColor: '#dddddd' }}>
                                            <View style={{ flex: 2}}>
                                                <Image source={require('../assets/b.jpg')}
                                                    style={{ flex: 1, width: null, height: null, 
                                                    resizeMode: 'cover'}}
                                                    />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                                <Text style={{ color: 'white' }}>Experiences</Text>
                                            </View>
                                        </View>

                                        <View style={{height: 130, width: 130, marginLeft: 20,
                                            borderWidth: 0.5, borderColor: '#dddddd' }}>
                                            <View style={{ flex: 2}}>
                                                <Image source={require('../assets/c.jpg')}
                                                    style={{ flex: 1, width: null, height: null, 
                                                    resizeMode: 'cover'}}
                                                    />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                                <Text style={{ color: 'white' }}>Restaurant</Text>
                                            </View>
                                        </View>

                                    </ScrollView>
                                </View>

                                <View style={{marginTop: 20, paddingHorizontal: 20}}>
                                    <Text style={{ fontSize: 24, fontWeight: '700', color: 'white'}}>
                                        Introducing Plus
                                    </Text>
                                    <Text style={{ fontWeight: '100', marginTop: 10, color: 'white'}}>
                                        A new selection of homes verified for quality & comfort
                                    </Text>
                                    <View style={{width:width-40, height: 200, marginTop: 20}}>
                                        <Image style={{flex: 1, height: null, width: null, 
                                            resizeMode: 'cover', borderRadius: 5, borderWidth: 1,
                                            borderColor: '#dddddd'}}
                                            source={require('../assets/a.jpg')}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 40}}>
                                <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20, 
                                    color: 'white'}}>
                                    Home around the world
                                </Text>
                                <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row',
                                    flexWrap: 'wrap', justifyContent: 'space-between' , marginBottom: 10}}>
                                        
                                    <View style={{width:width/2-30, height:width/2-30, borderWidth:0.5, 
                                        borderColor: '#dddddd'}}>
                                        <View style={{ flex: 1 }}>
                                            <Image style={{ flex:1, width:null, height:null, 
                                                resizeMode:'cover' }}
                                                source={require('../assets/a.jpg')}
                                            />
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-start', 
                                            justifyContent: 'space-evenly', paddingLeft: 10 }}>
                                            <Text style={{ fontSize: 10, color: 'white'}}>
                                                PRIVATE ROOM - 2 BEDS
                                            </Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white'}}>
                                                The Cozy Palace
                                            </Text>
                                            <Text style={{ fontSize: 10, color: 'white'}}>
                                                $82
                                            </Text>
                                            <StarRating
                                                disable={true}
                                                maxStars={5}
                                                rating={4}
                                                starSize={10}
                                            />
                                        </View>
                                    </View>

                                    <View style={{width:width/2-30, height:width/2-30, borderWidth:0.5, 
                                        borderColor: '#dddddd'}}>
                                        <View style={{ flex: 1 }}>
                                            <Image style={{ flex:1, width:null, height:null, 
                                                resizeMode:'cover' }}
                                                source={require('../assets/a.jpg')}
                                            />
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-start', 
                                            justifyContent: 'space-evenly', paddingLeft: 10 }}>
                                            <Text style={{ fontSize: 10, color: 'white'}}>
                                                PRIVATE ROOM - 2 BEDS
                                            </Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white'}}>
                                                The Cozy Palace
                                            </Text>
                                            <Text style={{ fontSize: 10, color: 'white'}}>
                                                $82
                                            </Text>
                                            <StarRating
                                                disable={true}
                                                maxStars={5}
                                                rating={4}
                                                starSize={10}
                                            />
                                        </View>
                                    </View>

                                    <View style={{width:width/2-30, height:width/2-30, borderWidth:0.5, 
                                        borderColor: '#dddddd'}}>
                                        <View style={{ flex: 1 }}>
                                            <Image style={{ flex:1, width:null, height:null, 
                                                resizeMode:'cover' }}
                                                source={require('../assets/a.jpg')}
                                            />
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-start', 
                                            justifyContent: 'space-evenly', paddingLeft: 10 }}>
                                            <Text style={{ fontSize: 10, color: 'white'}}>
                                                PRIVATE ROOM - 2 BEDS
                                            </Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white'}}>
                                                The Cozy Palace
                                            </Text>
                                            <Text style={{ fontSize: 10, color: 'white'}}>
                                                $82
                                            </Text>
                                            <StarRating
                                                disable={true}
                                                maxStars={5}
                                                rating={4}
                                                starSize={10}
                                            />
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                    
                <View>

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
        margin: 20
    }
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
    }
});
