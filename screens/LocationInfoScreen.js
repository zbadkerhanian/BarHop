import s from '../styles/global'
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from "react-native";
import { Header, Icon } from 'react-native-elements'
//import { Header, Left, Right, Icon } from 'native-base'
const { height, width } = Dimensions.get('window');

export default class LocationInfoScreen extends Component {
    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params;
    }
    
    render() {
        return (
            <View style={[s.global, styles.container]}>
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
                    //rightComponent={<Icon name="home" color='#fff' />}
                    containerStyle={{
                        height: 80,
                        backgroundColor: '#282828',
                        borderBottomColor:'#282828', 
                        borderBottomWidth:1 
                      }}
                    
                />
                    <View style={{marginTop: 20, paddingHorizontal: 20}}>
                        <Text style={styles.title}>
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
                    <Text style={styles.text}>{this.params.name} {this.params.rating} {this.params.cost} {this.params.distance}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        //,paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
    },
    text: {
        color: 'white',
        fontSize: 20,
        margin: 5
    },
    switch:{
        margin: 5
    },
    title: { 
        fontSize: 24, 
        fontWeight: '700', 
        color: 'white'
    },
});