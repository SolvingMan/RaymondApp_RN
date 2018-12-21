import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import SplashScreen from 'react-native-splash-screen' 

import Home from './src/Home/Home';
import Login from './src/login/Login';
import Signup from './src/login/Signup';
import Signup1 from './src/login/Singup1';
import Document from './src//Home/Document';
import Dashboard from './src/Dashborard';
import ForgotPass from './src/login/ForgotPass';

const LoginNavigator = createStackNavigator ({
  SigninScreen: { screen: Login , navigationOptions : {header : null}},
  SignupScreen1: { screen: Signup,  navigationOptions : {header : null}},
  SignupScreen2: { screen: Signup1,  navigationOptions : {header : null}},
  ForgotPassScreen: { screen: ForgotPass, navigationOptions : {header : null} }
},{
  swipeEnabled: false
});

const MainNavigator = createStackNavigator ({
  AuthScreen: { screen: LoginNavigator , navigationOptions : {header : null}},
  MainScreen: { screen: Dashboard,  navigationOptions : {header : null}},
},{
  animationEnabled: false,
  swipeEnabled: false,
  lazy: false,
});

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
    }
  }
  componentWillMount() {
  
  }

  componentDidMount() {
    console.disableYellowBox = true;
    SplashScreen.hide();
  }
  componentWillUnmount() {

  }
  render() {
    return (
      <MainNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
