import s from '../styles/styles'
import React, { Component } from "react";
import Navigation from "react-navigation"
import { 
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import { Header, Left, Right, Icon } from 'native-base'


export default class HomeScreen extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            <View style={[s.global, styles.container] }>
                <Header style={{backgroundColor:'light grey'}}>
                    <Left>
                        <Icon name="menu" onPress={() => {this.props.navigation.openDrawer()}}/>  
                    </Left>
                </Header>
                <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                    <Text>
                        HomeScreen
                    </Text>   
                </View>  
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
        //,paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
    }
});