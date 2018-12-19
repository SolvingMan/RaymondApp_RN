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

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      alertVisible: false,
      alertContent: '',
    }
    this.onPressLogin = this.onPressLogin.bind(this);
    this.signup = this.signup.bind(this);
  }

  componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  componentWillUnmount() {

  }

  signup() {
    this.props.navigation.navigate('SignupScreen1');
  }

  onPressLogin = () => {
    if (this.state.user_name == '' || this.state.user_pass == '') {
        Alert.alert("Please insert \n username or password");
        return;
    }
    fetch("http://18.209.93.188/api/signin?username="+this.state.user_name+"&password="+this.state.user_pass, {
        method: "GET",
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.action === "true") {
          setUserID(responseJson.result._id);
          // Alert.alert("Login Sucess");   
          EventRegister.emit("LoginSuccess");
      }
      if (responseJson.action === "false")  Alert.alert("Invaild username or password"); 
    console.log(responseJson.action)
    }).catch((error) => {
        // console.error(error);
        Alert.alert("Network is disconnected")
        return;
      });
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
                style={styles.email}
                placeholder='Email'
                placeholderTextColor = "black"
                autoCapitalize='none'
                maxLength = {40}
                keyboardType = "email-address"
                ref="email"
                onChangeText={(email) => this.setState({email})} 
                />

                <TextInput
                style={styles.password}
                placeholder='Password'
                placeholderTextColor = "black"
                autoCapitalize='none'
                maxLength = {40}
                secureTextEntry={true}
                ref="password"
                onChangeText={(password) => this.setState({password})} 
                />

                <View style={styles.loginDiv}>
                    <TouchableOpacity
                        style={styles.signInButton}
                    > 
                    <Text style={styles.signIn}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.signInButton, {position: 'absolute', right: 0}]}
                        onPress={this.signup}
                    > 
                    <Text style={styles.signIn}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <Text style={styles.note}>
                Please log in above to send your paperwork to us
            </Text>

            <TouchableOpacity style={styles.forgotDiv}> 
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
        
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
        marginTop: '12%',
        width: '100%',
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
