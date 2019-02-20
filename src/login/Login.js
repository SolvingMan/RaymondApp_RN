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
    ActivityIndicator
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import { getDevicePixel, setUser } from '@global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AsyncStorage } from "react-native"
const logo = require('../img/logo1.png');
const usericon = require('../img/usericon.png');


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            alertVisible: false,
            alertContent: '',
            checked: false
        }
        this.rmail = '';
        this.rpassword = '';

        this.onPressLogin = this.onPressLogin.bind(this);
        this.signup = this.signup.bind(this);
    }

    componentWillMount() {
        this.getCheck();
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }
    async getCheck() {
        try {
            const value = await AsyncStorage.getItem('remember');
            if (value === "ture") {
                console.log("here is console login ", value)
                await this.getMail();
                await this.getPassword();
                console.log(this.rpassword);
                fetch("http://raymondray111.raytax.co.uk/public/api/user/login?email=" + this.rmail + "&password=" + this.rpassword, {
                    method: "POST",
                })
                    .then((response) => response.json())
                    .then((responseJson) => {

                        if (responseJson.result === "success") {
                            setUser(responseJson);
                            this.props.navigation.navigate('MainScreen');
                            console.log(this.state.password);
                        } else {
                            Alert.alert("Email or Password is Invalid");
                        }
                        console.log(responseJson);
                        this.setState({ loading: false });
                    }).catch((error) => {
                        this.setState({ loading: false });
                        console.log("_______________________________________", error);
                        return;
                    });

            } else {
                console.log("here is sdsfdddddfsdfsdfsdf login ", value)
            }
        } catch (error) {
            // Error retrieving data
            return;
        }
        return value;
    }

    async setCheck(val) {
        try {
            await AsyncStorage.setItem('remember', val);
        } catch (error) {
            // Error saving data
            return;
        }
    }

    async setMail(val) {
        try {
            await AsyncStorage.setItem('mail', val);
        } catch (error) {
            // Error saving data
            return;
        }
    }

    async getMail() {
        try {
            this.rmail = await AsyncStorage.getItem('mail');
            console.log( this.rmail);
        } catch (error) {
            // Error saving data
            return;
        }
    }

    async setPassword(val) {
        try {
            await AsyncStorage.setItem('password', val);
        } catch (error) {
            // Error saving data
            return;
        }
    }

    async getPassword() {
        try {
            this.rpassword = await AsyncStorage.getItem('password');
        } catch (error) {
            // Error saving data
            return;
        }
    }

    signup() {
        this.props.navigation.navigate('SignupScreen1');
    }

    onPressLogin() {
        if (this.state.email == '' || this.state.password == '') {
            Alert.alert("Please insert \n username or password");
            console.log(this.state.email);
            return;
        }
        this.setState({ loading: true });

        if (this.state.checked) {
            this.setCheck("ture");
            this.setMail(this.state.email);
            this.setPassword(this.state.password);

        } else {
            this.setCheck("false");
        }

        fetch("http://raymondray111.raytax.co.uk/public/api/user/login?email=" + this.state.email + "&password=" + this.state.password, {
            method: "POST",
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.result === "success") {
                    setUser(responseJson);
                    this.props.navigation.navigate('MainScreen');
                    console.log(this.state.password);
                } else {
                    Alert.alert("Email or Password is Invalid");
                }
                console.log(responseJson);
                this.setState({ loading: false });
            }).catch((error) => {
                this.setState({ loading: false });
                console.log("_______________________________________", error);
                return;
            });
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
                    source={logo}
                    style={styles.logo}
                />
                <View style={styles.accountInfo}>
                    <Image
                        source={usericon}
                        style={styles.usericon}
                    />
                    <TextInput
                        style={styles.email}
                        placeholder='Email'
                        placeholderTextColor="#a6a6a6"
                        autoCapitalize='none'
                        maxLength={40}
                        keyboardType="email-address"
                        ref="email"
                        onChangeText={(email) => this.setState({ email })}
                    />

                    <TextInput
                        style={styles.password}
                        placeholder='Password'
                        placeholderTextColor="#a6a6a6"
                        autoCapitalize='none'
                        maxLength={40}
                        secureTextEntry={true}
                        ref="password"
                        onChangeText={(password) => this.setState({ password })}
                    />
                    <View style={styles.loginDiv}>
                        {this.state.loading ?
                            <View
                                style={styles.signInButton}
                                onPress={this.onPressLogin}
                            >
                                <ActivityIndicator size="small" />
                            </View>
                            :
                            <TouchableOpacity
                                style={styles.signInButton}
                                onPress={this.onPressLogin}
                            >
                                <Text style={styles.signIn}>Sign In</Text>
                            </TouchableOpacity>
                        }

                        {/* <TouchableOpacity
                        style={[styles.signInButton, {position: 'absolute', right: 0}]}
                        onPress={this.signup}
                    > 
                    <Text style={styles.signIn}>Sign Up</Text>
                    </TouchableOpacity> */}
                    </View>

                </View>

                <CheckBox
                    title='Remember Me'
                    checked={this.state.checked}
                    onPress={() => this.setState({ checked: !this.state.checked })}
                />

                <Text style={styles.note}>
                    Please log in above to send your paperwork to us
            </Text>

                <TouchableOpacity style={styles.forgotDiv}
                    onPress={() => this.props.navigation.navigate("ForgotPassScreen")}
                >
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* <View
                style={{flexDirection: 'row'}}
            >
                <Text>Please request Raymond’s Accountants</Text>
                <TouchableOpacity
                    style={{marginLeft: getDevicePixel(3)}}
                    onPress={this.signup}
                >
                    <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline'}}>Sing Up</Text>
                </TouchableOpacity>
            </View> */}
                {/* </View> */}
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        //   justifyContent: 'center',
    },
    logo: {
        marginTop: '12%',
        width: '70%',
        height: '25%'
    },
    accountInfo: {
        marginTop: '3%',
        width: '100%',
        height: '40%',
        backgroundColor: '#0097F5',
        alignItems: 'center',
    },
    usericon: {
        width: getDevicePixel(15),
        height: getDevicePixel(15),
        borderRadius: getDevicePixel(7.5),
        marginTop: getDevicePixel(2),
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
        // flexDirection: 'row',
        alignItems: 'center',
        marginTop: '6%',
        width: '80%',
        height: getDevicePixel(10),
        // backgroundColor: 'grey'
    },
    signInButton: {
        width: getDevicePixel(35),
        height: getDevicePixel(10),
        borderRadius: getDevicePixel(1),
        backgroundColor: '#CFD8DC',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signIn: {
        fontSize: getDevicePixel(5),
        fontWeight: 'bold'
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
