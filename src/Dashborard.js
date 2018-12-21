import React, { Component } from 'react';
import { DrawerNavigator, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import {ScrollView, Text, View, Platform, TouchableOpacity, StyleSheet, Dimensions, Button, Image} from 'react-native';
import { getDevicePixel } from '@global';

import Home from './Home/Home';
import Document from './Home/Document';
import Profile from './Profile/Profile';
import Photo from './Home/Photo';
import Edit from './Home/Edit';
import Login from './login/Login';

const logo = require('./img/splash.png');

export default class Dashboard extends Component{

    constructor(props){
      super(props);
      this.state = {
      }
      const { navigation } = this.props;
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

  const MainNavigator = createStackNavigator ({
    HomeScreen: { screen: Home, navigationOptions : {header : null}},
    DocumentScreen: { screen: Document,  navigationOptions : {header : null}},
    PhotoScreen: { screen: Photo,  navigationOptions : {header : null}},
    EditScreen: { screen: Edit,  navigationOptions : {header : null}},
  },{
    swipeEnabled: false
  });

  class MyHomeScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={logo}
          style={[styles.icon, {tintColor: tintColor}]}
          resizeMode='contain'
        />
      ),
    };
  
    render() {
      return (
        // <Button
        //   onPress={() => this.props.navigation.navigate('Notifications')}
        //   title="Go to notifications"
        // />
        <MainNavigator />
      );
    }
  }
  
  class MyProfileScreen extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Profile',
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
        //   onPress={() => this.props.navigation.goBack()}
        //   title="Go back home"
        // />
        <Profile />
      );
    }
  }
  
  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });

  const Logout = () => {
    return (
      <TouchableOpacity style={{width: 30, height: 30, backgroundColor: 'red'}}
        // onPress={()=>this.props.navigation.navigate("AuthScreen")}
      />
    )
  }
  
  const MyDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: MyHomeScreen,
    },
    Profile: {
      screen: MyProfileScreen,
    },
    Logout: {
      screen: Logout,
    },
  },
  { navigationOptions: ({ navigation }) => ({
    header: <View style={{height: getDevicePixel(15), width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0097F5'}}>
    <Text style={{fontSize: getDevicePixel(5.7), marginTop: getDevicePixel(5), fontWeight: 'bold', color: '#fafafa'}}>Raymond's Accountants</Text>
      <TouchableOpacity style={{right :0, width:15, height: 15, backgroundColor: 'red'}}
        onPress={()=> this.props.navigation.toggleDrawer()}
      ></TouchableOpacity>
    </View>
    }),
      drawerPosition: 'right',
      title: { headertitle: 'Welcome'}
  }
  );

  const MyStackNavigator =  createStackNavigator(
    { 
        drawer: {
            screen: MyDrawerNavigator,
            navigationOptions: ({ navigation }) => ({
                header: <View style={{height: getDevicePixel(15), width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0097F5'}}>
                <Text style={{fontSize: getDevicePixel(5.7), marginTop: getDevicePixel(5), fontWeight: 'bold', color: '#fafafa'}}>Raymond's Accountants</Text>
                  <TouchableOpacity style={{right :0, width:15, height: 15, backgroundColor: 'red'}}
                    onPress={()=> this.navigation.toggleDrawer()}
                  ></TouchableOpacity>
                </View>
              }),
        }
    },
    {
      animationEnabled: false,
      swipeEnabled: false
    }
);