import React, { Component } from "react";
import Navigation from "react-navigation"
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import { Header, Left, Right, Icon } from 'native-base'


export default class HomeScreen extends Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>
                <Header style={{backgroundColor:'grey'}}>
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
    }
});