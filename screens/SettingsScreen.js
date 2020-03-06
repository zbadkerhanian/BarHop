import s from '../styles/global'
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Header, Icon } from 'react-native-elements'

export default class SettingsScreen extends Component {
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
                    containerStyle={{
                        height: 80,
                        backgroundColor: '#282828',
                        borderBottomColor:'#282828', 
                        borderBottomWidth:1 
                      }}
                    
                />
                <View style={{flex: 1,flexDirection:'row'}}>
                    <View style={{flex:4,flexDirection:'column'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Notifications')}>
                            <Text style={styles.text}>Notifications</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Privacy')}>
                            <Text style={styles.text}>Privacy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Security')}>
                            <Text style={styles.text}>Security</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,flexDirection:'column'}}>
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