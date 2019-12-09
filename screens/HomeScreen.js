import s from '../styles/global'

import React, { Component } from 'react';
//import MapView from 'react-native-maps';

import { 
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
    SafeAreaView,
    ScrollView,
    Dimensions
} from 'react-native';
import { Header, Icon } from '../react-native-elements';
import {Utilities} from '../global_functions/Utilities';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import StarRating from 'react-native-star-rating'


const { height, width } = Dimensions.get('window');

const LocationInfo = [
    {
      name: 'Tiki Ti',
      rating:1,
      cost:"$",
      distance:'1.1 miles',
      image:<Image style={{ flex:1, width:null, height:null, resizeMode:'cover' }}
        source={require('../assets/Tiki_Ti.jpg')}/>,
      description:<Text>The Tiki Ti is a Polynesian-themed tiki bar on Sunset Boulevard, in the Los Feliz district of Los Angeles. It is considered by many to be the very epitome of the Tiki tavern style.</Text>
    },
    {
      name: 'The Varnish',
      rating:3,
      cost:'$$',
      distance:'1.2 miles',
      image:<Image style={{ flex:1, width:null, height:null, resizeMode:'cover' }}
        source={require('../assets/The_Varnish.jpg')}/>,
      description:<Text>Mixologists handcraft custom cocktails at this dark, moody speakeasy hidden behind Cole's bar.</Text>
    },
    {
        name: 'Frolic Room',
        rating:5,
        cost:'$$$',
        distance:'1.3 miles',
        image:<Image style={{ flex:1, width:null, height:null, resizeMode:'cover' }}
            source={require('../assets/Frolic_Room.jpg')}/>,
        description:<Text>Photos of movie stars deck the walls at this historic, no-frills bar, famous for its jukebox.</Text>
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
                                height: 80,
                                backgroundColor: '#282828',
                                borderBottomColor: '#282828', 
                                borderBottomWidth: 1 
                            }}

                        />
                    }
                    // headerHeight={Platform.OS === 'ios' ? 60 : 80}
                    headerHeight={80}
                    //statusBarHeight={Platform.OS === 'ios' ? 20 : 0}
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
                                                <Image source={require('../assets/Bars.jpg')}
                                                    style={{ flex: 1, width: null, height: null, 
                                                    resizeMode: 'cover'}}
                                                    />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                                <Text style={{ color: 'white' }}>Bars</Text>
                                            </View>
                                        </View>

                                        <View style={{height: 130, width: 130, marginLeft: 20,
                                            borderWidth: 0.5, borderColor: '#dddddd' }}>
                                            <View style={{ flex: 2}}>
                                                <Image source={require('../assets/Clubs.jpg')}
                                                    style={{ flex: 1, width: null, height: null, 
                                                    resizeMode: 'cover'}}
                                                    />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                                <Text style={{ color: 'white' }}>Clubs</Text>
                                            </View>
                                        </View>

                                        <View style={{height: 130, width: 130, marginLeft: 20,
                                            borderWidth: 0.5, borderColor: '#dddddd' }}>
                                            <View style={{ flex: 2}}>
                                                <Image source={require('../assets/Lounges.jpg')}
                                                    style={{ flex: 1, width: null, height: null, 
                                                    resizeMode: 'cover'}}
                                                    />
                                            </View>
                                            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                                <Text style={{ color: 'white' }}>Lounges</Text>
                                            </View>
                                        </View>

                                    </ScrollView>
                                </View>
                            </View>
                            <View style={{ marginTop: 40, 
                                paddingHorizontal: 20
                                }}>
                                <Text style={styles.title}>
                                    Home around the world
                                </Text>
                                <View style={{ marginTop: 20, flexDirection: 'row',
                                    flexWrap: 'wrap', 
                                    // justifyContent: 'space-between' , 
                                    marginBottom: 10}}>
                                        
                                    <FlatList
                                        data={LocationInfo}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({item}) =>
                                            <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate('LocationInfo', {
                                                name: item.name,
                                                rating: item.rating,
                                                cost: item.cost,
                                                distance: item.distance,
                                                image: item.image,
                                                description: item.description
                                            })}
                                            >
                                            <View style={styles.placeContainer}>
                                                <View style={{ flex: 1 }}>
                                                    {item.image}
                                                </View>
                                                <View style={{ height: 70, alignItems: 'flex-start', 
                                                    justifyContent: 'space-evenly', 
                                                    paddingLeft: 10 }}>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                                                        {item.name}
                                                    </Text>
                                                    <Text style={{ fontSize: 10, color: 'white'}}>
                                                        {item.distance}
                                                    </Text>
                                                    <Text style={{ fontSize: 10, color: 'white'}}>
                                                        {item.cost}
                                                    </Text>
                                                    <StarRating
                                                        disable={true}
                                                        fullStarColor="gold"
                                                        maxStars={5}
                                                        rating={item.rating}
                                                        starSize={15}
                                                    />
                                                </View>
                                            </View>  
                                            </TouchableOpacity>
                                        }
                                        keyExtractor={item => item.name}
                                    />                                               
                                </View>
                                
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                
                
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
        margin: 20
    },
    title: { 
        fontSize: 24, 
        fontWeight: '700', 
        color: 'white'
    },
    placeContainer: {
        width:width-40,
        height:width/2, 
        borderWidth:0.5, 
        borderColor: 'grey',
        borderRadius: 4,
        // margin: 20
        marginVertical: 10
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
