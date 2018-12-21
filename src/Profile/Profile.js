import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import { getDevicePixel, getUser } from '@global';

const logo = require('../img/logo1.png');
const usericon = require('../img/usericon.png');

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      alertVisible: false,
      alertContent: '',
    }
  }

  componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  componentWillUnmount() {

  }

  render() {
    return (
        <View style={styles.container}>
            <Image 
                source = {logo}
                style = {styles.logo}
            />
            <Text style={styles.title}>Profile</Text>
            <View style = {{flexDirection: 'row', marginTop: getDevicePixel(3)}}>
                <Text style={{fontSize: 20}}>First Name  :  </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{getUser().first_name}</Text>
            </View> 

            <View style = {{flexDirection: 'row', marginTop: getDevicePixel(1)}}>
                <Text style={{fontSize: 20}}>Last Name  :  </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{getUser().last_name}</Text>
            </View>

            <View style = {{flexDirection: 'row', marginTop: getDevicePixel(1)}}>
                <Text style={{fontSize: 20}}>User Name  :  </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{getUser().username}</Text>
            </View>

             <View style = {{flexDirection: 'row', marginTop: getDevicePixel(1)}}>
                <Text style={{fontSize: 20}}>           Email  :  </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{getUser().username}</Text>
            </View>

             <View style = {{flexDirection: 'row', marginTop: getDevicePixel(1)}}>
                <Text style={{fontSize: 20}}>     Address  :  </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{getUser().address}</Text>
            </View>

            <View style = {{flexDirection: 'row', marginTop: getDevicePixel(1)}}>
                <Text style={{fontSize: 20}}>     Website  :  </Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{getUser().website_address}</Text>
            </View>     
        </View>
    );
  }
}

const styles=StyleSheet.create({
    container : {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
    //   justifyContent: 'center',
    },
    title: {
        fontSize: getDevicePixel(8), 
        color: '#0097F5'
    },
    logo: {
        marginTop: '3%',
        width: '60%',
        height : '25%'
    },
    accountInfo: {
        marginTop: '3%',
        width : '100%',
        height: '40%',
        backgroundColor: '#0097F5',
        alignItems: 'center',
    },
    usericon: {
        width: getDevicePixel(15),
        height: getDevicePixel(15),
        borderRadius: getDevicePixel(7.5),
        marginTop: getDevicePixel(3),
    },
    email: {
        marginTop: getDevicePixel(5),
        width: '90%',
        height: getDevicePixel(10),
        backgroundColor: 'white',
        padding: 0,
        paddingLeft: getDevicePixel(3),
        color: 'black'
    },
    password: {
        marginTop: getDevicePixel(5),
        width: '90%',
        height: getDevicePixel(10),
        backgroundColor: 'white',
        padding: 0,
        paddingLeft: getDevicePixel(3),
        color: 'black'
    },
    loginDiv: {
        flexDirection: 'row',
        marginTop: '8%',
        width: '80%',
        height: getDevicePixel(10),
        // backgroundColor: 'grey'
    },
    signInButton: {
        width: getDevicePixel(35),
        height: getDevicePixel(10),
        backgroundColor: '#CFD8DC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    note: {
        width: '70%',
        marginTop: getDevicePixel(5),
        fontSize: 18,
        color: '#7B8D93',
        textAlign: 'center'
    },
    forgotDiv: {
        marginTop: '5%',
        width: '60%',
        height: getDevicePixel(10),
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },
    forgotText: {
        fontSize: 15, 
        color: '#7B8D93',
        textDecorationLine: 'underline',
    }

});
