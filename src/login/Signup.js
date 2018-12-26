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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const logo = require('../img/logo1.png');
const usericon = require('../img/usericon.png');

export default class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      address: '',
      companyname: '',
      websitelink: '',

      alertVisible: false,
      alertContent: '',
    }
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
  }

  componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  componentWillUnmount() {

  }

  next() {
    //   console.log(this.state.firstname);
    //   console.log(this.state.lastname);
    //   console.log(this.state.address);
    //   console.log(this.state.companyname);
    //   console.log(this.state.websitelink);
      if (this.state.firstname == '' || this.state.lastname == '' || this.state.address == '' || this.state.companyname == '' || this.state.websitelink == '') {
        Alert.alert("Please insert all field");
        console.log(this.state.email);
        return;
    }
      this.props.navigation.navigate('SignupScreen2', 
            {
                firstname: this.state.firstname, 
                lastname: this.state.lastname, 
                address: this.state.address,
                companyname: this.state.address,
                websitelink: this.state.websitelink,
            }
        )
    
  }

  back() {
    this.props.navigation.navigate('SigninScreen');
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
                placeholder='First Name'
                placeholderTextColor = "#a6a6a6"
                autoCapitalize='none'
                maxLength = {40}
                ref="firstname"
                onChangeText={(firstname) => this.setState({firstname})} 
                />

                <TextInput
                style={styles.inputStyle}
                placeholder='Last Name'
                placeholderTextColor = "#a6a6a6"
                autoCapitalize='none'
                maxLength = {40}
                ref="lastname"
                onChangeText={(lastname) => this.setState({lastname})} 
                />

                <TextInput
                style={styles.inputStyle}
                placeholder='Address'
                placeholderTextColor = "#a6a6a6"
                autoCapitalize='none'
                maxLength = {40}
                ref="address"
                onChangeText={(address) => this.setState({address})} 
                />

                <TextInput
                style={styles.inputStyle}
                placeholder='Company Name'
                placeholderTextColor = "#a6a6a6"
                autoCapitalize='none'
                maxLength = {40}
                ref="companyname"
                onChangeText={(companyname) => this.setState({companyname})}
                />

                <TextInput
                style={styles.inputStyle}
                placeholder='Website Link'
                placeholderTextColor = "#a6a6a6"
                autoCapitalize='none'
                maxLength = {40}
                ref="websitelink"
                onChangeText={(websitelink) => this.setState({websitelink})}
                />

          

                <View style={styles.loginDiv}>
                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress={this.back}
                    > 
                    <Text style={styles.signIn}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.signInButton, {position: 'absolute', right: 0}]}
                        onPress={this.next}
                    > 
                    <Text style={styles.signIn}>Next</Text>
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
        marginTop: '6%',
        width: '80%',
        height : '22%',
        resizeMode: 'contain'
    },
    accountInfo: {
        marginTop: '0%',
        width : '100%',
        height: '60%',
        backgroundColor: '#0097F5',
        alignItems: 'center',
    },
    usericon: {
        width: getDevicePixel(15),
        height: getDevicePixel(15),
        borderRadius: getDevicePixel(7.5),
        marginTop: getDevicePixel(2),
    },
    inputStyle: {
        marginTop: getDevicePixel(2),
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
        flexDirection: 'row',
        marginTop: '6%',
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
