import s from '../styles/global'
import React, { Component } from 'react';
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
    Dimensions,
    Linking
} from 'react-native';
import { Header, Icon } from '../react-native-elements';
import {Utilities} from '../global_functions/Utilities';
import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';
import { GooglePlacesAutocomplete, dataJSON } from '../react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import StarRating from 'react-native-star-rating'
import ModalDropdown from 'react-native-modal-dropdown'


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

    geoOptions={
        enableHighAccuracy:true,
    };

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
        //navigator.geolocation.watchPosition(this.geoSuccess,this.geoFailure,this.geoOptions);

    }

    componentDidMount(){
        //_utilities.getUserLocation(this.geoSuccess);
    }

    geoFailure = (err)=>{
        console.log(err);
    }

    geoSuccess = (position) => {
        console.log("geoSuccess function called")
        this.setState({
            ready: true,
            // where: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            // }
        })
    }
    
    getGeo(){
        console.log('getGeo'); 
        _utilities.getUserLocation(this.geoSuccess);
        //console.log('new state is .. ', this.state.lat, this.state.lng);
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
        .then((response) => response.json()).then((result)=> console.log("result of beanstalk call:", result));
    }
    render() {
        console.log("homeScreen Render")
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
                                // <View style={{flex:1, flexDirection:'row', paddingHorizontal:10, marginVertical: 10, backgroundColor: '#202020'}}>
                                //     <Icon name='search' color='#C2185B' containerStyle={{paddingTop: 5.15, marginRight: 10}}/>
                                //     <TextInput 
                                //         placeholder='Search' 
                                //         style={{
                                //             color: '#fff', 
                                //             flex:1, 
                                //             lineHeight: 35
                                //         }}
                                //         returnKeyType='go'
                                //         onSubmitEditing={() => {console.log('searched something');}}
                                //         />
                                // </View>
                                {
                                    text: 'BarHop', 
                                    style: { 
                                        color: '#C2185B', 
                                        fontSize: 25 
                                    } 
                                }
                            }
            
                            containerStyle={{
                                height: 80,
                                backgroundColor: '#282828',
                                borderBottomColor: '#282828', 
                                borderBottomWidth: 1 
                            }}

                        />
                    }
                    headerHeight={80}
                    disableHeaderSnap={true}
                >
                <GooglePlacesAutocomplete
                        placeholder = 'Search'
                        minLength   = {2}       // minimum length of text to search
                        returnKeyType     = {'search'}  // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed = 'auto'      // true/false/undefined
                        fetchDetails= {true}
                        // renderDescription={(row) => row.description} // custom description render
                        onPress = {(details = null) => { // 'details' is provided when fetchDetails = true
                            
                            console.log(details);
                            

                        }}
                        textInputProps={{
                            onChangeText: (location) => {console.log("changeText"); this.setState({ location })}
                        }}
                        getDefaultValue={() => {
                            return '' // text input default value
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key     : 'AIzaSyD6rppdrN6erbeSzJS7pLIs8VVifeePXFs',
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
                                        <TouchableOpacity onPress={() => {console.log("Open Universal Deeplink"); Linking.openURL("https://m.uber.com/ul/?action=setPickup&client_id=vQI_ycPZAiK7i9Ru0_ZcqH2FSxaCPqdk&pickup=my_location&dropoff[formatted_address]=20455%20Acre%20St%2C%20Winnetka%2C%20CA%2C%20USA&dropoff[latitude]=34.230169&dropoff[longitude]=-118.579539");}}>
                                            <View style={{height: 130, width: 130, marginLeft: 20,
                                            borderWidth: 0.5, borderColor: '#dddddd', borderRadius: 4, overflow:"hidden"}}>
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
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity onPress={() => {console.log("Open Standard Deeplink"); Linking.openURL('uber://?action=setPickup&client_id=vQI_ycPZAiK7i9Ru0_ZcqH2FSxaCPqdk&pickup=my_location&dropoff[formatted_address]=20455%20Acre%20St%2C%20Winnetka%2C%20CA%2C%20USA&dropoff[latitude]=34.230169&dropoff[longitude]=-118.579539');}}>
                                        <View style={{height: 130, width: 130, marginLeft: 20,
                                            borderWidth: 0.5, borderColor: '#dddddd', borderRadius: 4}}>
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
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => console.log("Lounges")}>
                                        <View style={{height: 130, width: 130, marginLeft: 20,
                                            borderWidth: 0.5, borderColor: '#dddddd', borderRadius: 4}}>
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
                                        </TouchableOpacity>

                                    </ScrollView>
                                </View>
                            </View>
                            <View style={{ marginTop: 40, 
                                paddingHorizontal: 20
                                }}>

                                <View style={{flexDirection: "row"}}>
                                <Text style={{fontSize: 24, fontWeight: '700', 
                                color: 'white', flex:1}}>
                                    Bars Near You
                                </Text>
                                <ModalDropdown textStyle={styles.title} 
                                style={{
                                    justifyContent: "flex-end",
                                    flexDirection: "row"
                                  }}
                                defaultValue={'Sort By'} 
                                options={['Distance', 'Price: High to Low', 'Price: Low to High', 'Rating']}
                                
                                />
                                </View>
                                    
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
                                                    <Text style={{ fontSize: 12, color: 'white'}}>
                                                        {item.distance}
                                                    </Text>
                                                    <Text style={{ fontSize: 12, color: 'white'}}>
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
                
                
                {/* <View style={styles.container}>
                    <View style={styles.container}>
                        <Text style={loginStyles.header}>Welcome:{props.name}</Text>
                        <Image style={loginStyles.image} source={{ uri: props.photoUrl }} />
                        <Text style={styles.text}>Welcome: {global.name}</Text>
                        <Image style={loginStyles.image} source={{ uri: global.photoUrl }} />
                    </View>
                    <TouchableOpacity onPress={() => this.getGeo()}><Text style={{paddingBottom: 40, color:'#C2185B', fontSize: 20}}>TEST</Text></TouchableOpacity>

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
                </View> */}
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
        borderColor: '#dddddd',
        borderRadius: 4,
        marginVertical: 10,
        overflow:"hidden"
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
