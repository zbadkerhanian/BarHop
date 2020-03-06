import s from '../styles/global'
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";
import { Header } from 'react-native-elements'
const { height, width } = Dimensions.get('window');

export default class LocationInfoScreen extends Component {
    constructor(props){
        super(props);
        this.params = this.props.route.params;
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
                    leftComponent={{ 
                        icon: "chevron-left",
                        color:'#C2185B', 
                        underlayColor:'#282828',
                        onPress: () => this.props.navigation.goBack()
                    }}
                    centerComponent={{ 
                        text: 'BarHop', 
                        style: { 
                            color: '#C2185B', 
                            fontSize: 25 
                        } 
                    }}
                    containerStyle={{
                        height: 80,
                        backgroundColor: '#282828',
                        borderBottomColor:'#282828', 
                        borderBottomWidth:1 
                      }}
                    
                />                    
                    <View style={{marginTop: 20, paddingHorizontal: 20}}>
                        <Text style={styles.title}>
                            {this.params.name}
                        </Text>
                        <View style={{width:width-40, height: 200, marginTop: 20}}>
                            {this.params.image}
                        </View>
                        <Text style={styles.text}>
                            {this.params.description}
                        </Text>
                    </View>
                    
                    <Text style={styles.text}>{this.params.name}, {this.params.cost}, {this.params.distance}</Text>
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
    home:{
        color: 'white',
        fontSize: 20,
        margin: 5,
        textDecorationLine: 'underline'
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