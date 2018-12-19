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
import { getDevicePixel } from '@global';

const logo = require('../img/logo1.png');
const usericon = require('../img/usericon.png');

export default class Signup1 extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        confirm_password: ''

    }
    const { navigation } = this.props;
    this.firstname = navigation.getParam('firstname');
    this.lastname = navigation.getParam('lastname');
    this.address = navigation.getParam('address');
    this.companyname = navigation.getParam('companyname');
    this.websitelink = navigation.getParam('websitelink');
    this.signup = this.signup.bind(this);
  }

  componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  componentWillUnmount() {

  }

  signup() {
      console.log(this.firstname);
      console.log(this.state.password);
      console.log(this.state.confirm_password);
  }

  render() {
    return (
        <View style={styles.container}>
            <Image 
                source = {logo}
                style = {styles.logo}
            />
            <View style={styles.accountInfo}>
                <Image 
                    source = {usericon}
                    style = {styles.usericon}
                />
                <TextInput
                style={styles.inputStyle}
                placeholder='Email'
                placeholderTextColor = "black"
                autoCapitalize='none'
                keyboardType = "email-address"
                maxLength = {40}
                ref="email"
                onChangeText={(email) => this.setState({email})} 
                />

                <TextInput
                style={styles.inputStyle}
                placeholder='Password'
                placeholderTextColor = "black"
                autoCapitalize='none'
                secureTextEntry={true}
                maxLength = {40}
                ref="password"
                onChangeText={(password) => this.setState({password})} 
                />

                <TextInput
                style={styles.inputStyle}
                placeholder='Confirm Password'
                placeholderTextColor = "black"
                autoCapitalize='none'
                secureTextEntry={true}
                maxLength = {40}
                ref="confirm_password"
                onChangeText={(confirm_password) => this.setState({confirm_password})} 
                />
       
                <View style={styles.loginDiv}>
                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress = {this.signup}
                    > 
                    <Text style={styles.signIn}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <Text style={styles.note}>
               Already have an account?
            </Text>

            <View style={styles.forgotDiv}> 
                {/* <Text style={styles.forgotText}>Forgot Password?</Text> */}
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
    logo: {
        marginTop: '7%',
        width: '80%',
        height : '30%',
        resizeMode: 'contain'
    },
    accountInfo: {
        marginTop: '0%',
        width : '100%',
        height: '45%',
        backgroundColor: '#0097F5',
        alignItems: 'center',
    },
    usericon: {
        width: getDevicePixel(15),
        height: getDevicePixel(15),
        borderRadius: getDevicePixel(7.5),
        marginTop: getDevicePixel(3),
    },
    inputStyle: {
        marginTop: getDevicePixel(3),
        width: '90%',
        height: getDevicePixel(10),
        backgroundColor: 'white',
        padding: 0,
        paddingLeft: getDevicePixel(3),
        color: 'black'
    },
    password: {
        marginTop: getDevicePixel(2),
        width: '90%',
        height: getDevicePixel(10),
        backgroundColor: 'white',
        padding: 0,
        paddingLeft: getDevicePixel(3),
        color: 'black'
    },
    loginDiv: {
        // flexDirection: 'row',
        alignItems: 'center',
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#7B8D93',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    forgotDiv: {
        marginTop: '5%',
        width: '90%',
        height: getDevicePixel(10),
        // alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: 'blue'
    },
    forgotText: {
        fontSize: 15, 
        color: '#7B8D93'
    }

});
