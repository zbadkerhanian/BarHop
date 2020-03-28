import s from '../styles/global'
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet    
} from "react-native";
import { Header, Icon } from 'react-native-elements'
//import { Header, Left, Right, Icon } from 'native-base'


export default class FriendsListScreen extends Component {
    state={
        switchNotifications:false
    }
    render() {
        return (
            <View style={[s.global, styles.container]}>
                <Header
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
                <View style={{flex: 1,flexDirection:'row'}}>
                    <View style={{flex:4,flexDirection:'column'}}>
                            <Text style={styles.text}>Friends List</Text>
                    </View> 
                </View> 
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
    }
});