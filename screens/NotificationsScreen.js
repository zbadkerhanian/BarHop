import s from '../styles/global'
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    Switch,
    TouchableOpacity,
    
} from "react-native";
import { Header, Icon } from 'react-native-elements'
//import { Header, Left, Right, Icon } from 'native-base'


export default class NotificationsScreen extends Component {
    state={
        switchNotifications:false
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
                <View style={{flex: 1,flexDirection:'row'}}>
                    <View style={{flex:4,flexDirection:'column'}}>
                            <Text style={styles.text}>Pause All</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'column'}}>
                        <Switch trackColor={{true: '#C2185B', false: 'grey'}} thumbColor="white" style={styles.switch} value={this.state.switchNotifications} 
                            onValueChange={(switchNotifications) => this.setState({switchNotifications})}/>
                    </View>    
                </View> 
                {/* <StatusBar backgroundColor="white" barStyle="dark-content"/> */}
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