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
import { getDevicePixel, setUser } from '@global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
    this.username = this.firstname + " " + this.lastname;
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
      if (this.state.email == '' || this.state.password == '' || this.state.confirm_password == '') {
        Alert.alert("Please insert all field");
      } else if (this.state.password !== this.state.confirm_password) {
        Alert.alert("Password is different");
      } else {
          console.log("first_name="+this.firstname+"&last_name="+this.lastname+"&username="+this.username+"&company_name="+this.companyname+"&address="+this.address+"&website_address="+this.websitelink+"&email="+this.state.email+"&password="+this.state.password)
        fetch("http://raymondray111.raytax.co.uk/public/api/user/signup", {
            // ?first_name="+this.firstname+"&last_name="+this.lastname+"&username="+this.username+"&company_name="+this.companyname+"&address="+this.address+"&website_address="+this.websitelink+"&email="+this.state.email+"&password="+this.state.password
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: this.firstname,
                last_name: this.lastname,
                username: this.username,
                company_name: this.companyname,
                address: this.address,
                website_address: this.websitelink,
                email: this.state.email,
                password: this.state.password
            }),
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.result === "success") {
                setUser(responseJson);
                this.props.navigation.navigate('MainScreen');
              }
              else {
                Alert.alert("Email or Password is Invalid");
              }
              console.log(responseJson)
            })
            .catch((error) => {
                console.log(error);
                console.log("erro");
              Alert.alert("Network is disconnected");
              return
            });
      }
  }

  render() {
    return (
        <KeyboardAwareScrollView
        style={{ backgroundColor: '#fafafa' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        extraScrollHeight={0}
      >
        {/* <View style={styles.container}> */}
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
                placeholderTextColor = "#a6a6a6"
                autoCapitalize='none'
                keyboardType = "email-address"
                maxLength = {40}
                ref="email"
                onChangeText={(email) => this.setState({email})} 
                />

                <TextInput
                style={styles.inputStyle}
                placeholder='Password'
                placeholderTextColor = "#a6a6a6"
                autoCapitalize='none'
                secureTextEntry={true}
                maxLength = {40}
                ref="password"
                onChangeText={(password) => this.setState({password})} 
                />

                <TextInput
                style={styles.inputStyle}
                placeholder='Confirm Password'
                placeholderTextColor = "#a6a6a6"
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
            
            <TouchableOpacity
                onPress ={()=> this.props.navigation.navigate('SigninScreen')}
            >
                <Text style={styles.note}>
                Already have an account?
                </Text>
            </TouchableOpacity>

            <View style={styles.forgotDiv}> 
                {/* <Text style={styles.forgotText}>Forgot Password?</Text> */}
            </View>
        
        {/* </View> */}
        </KeyboardAwareScrollView>
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
