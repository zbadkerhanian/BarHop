import s from '../styles/global'
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Switch,
} from "react-native";
import { Header, Icon } from 'react-native-elements'

export default class NotificationsScreen extends Component {
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
                            <Text style={styles.text}>Pause All</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'column'}}>
                        <Switch trackColor={{true: '#C2185B', false: 'grey'}} thumbColor="white" style={styles.switch} value={this.state.switchNotifications} 
                            onValueChange={(switchNotifications) => this.setState({switchNotifications})}/>
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