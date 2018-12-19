import React, { Component } from 'react';
import { DrawerNavigator, createDrawerNavigator } from 'react-navigation';
import {ScrollView, Text, View, Platform, StyleSheet, Dimensions, Button, Image} from 'react-native';

import Home from './Home/Home';
import Document from './Home/Document';

export default class Dashboard extends Component{

    constructor(props){
      super(props);
      this.state = {
      }
    }

    componentWillMount() {}
    componentDidMount() {}
    componentWillUnmount() {}

    render() {
      return (
        <MyDrawerNavigator />
      );
    }
  }
  
  class MyHomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('./img/logo1.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  
    render() {
      return (
        // <Button
        //   onPress={() => this.props.navigation.navigate('Notifications')}
        //   title="Go to notifications"
        // />
        <Home />
      );
    }
  }
  
  class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Notifications',
      drawerIcon: ({ tintColor }) => (
        <Image
        source={require('./img/logo1.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  
    render() {
      return (
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      );
    }
  }
  
  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });
  
  const MyDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: MyHomeScreen,
    },
    Notifications: {
      screen: MyNotificationsScreen,
    },
  },
  {
      drawerPosition: 'right',
      title: { headertitle: 'Welcome'}
  }
  );
