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
import { getDevicePixel, getUser, setPage, setType } from '@global';


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
        username : '',
        firstname: '',
        lastname: ''
    }
    this.setPageType = this.setPageType.bind(this);
  }

  componentWillMount() {
  }
  
  componentDidMount() {
      console.log(getUser());
      this.setState({username: getUser().username });
      this.setState({firstname: getUser().first_name });
      this.setState({lastname: getUser().last_name });
  }
  
  componentWillUnmount() {

  }

  setPageType(type) {
      setPage(type);
      this.props.navigation.navigate('DocumentScreen');

  }



  render() {
    return (
        <View style={styles.container}>       
            <Text style={{fontSize: 30, color: '#7B8D93', marginTop: getDevicePixel(25)}}>Hi {this.state.firstname} {this.state.lastname}</Text>
            <Text style={{fontSize: 35, color: '#0097F5'}}>Let's get Started... </Text>

            <Text style={{fontSize: 24, color: '#7B8D93', marginTop: getDevicePixel(15)}}>Lets scan the paperwork</Text>
            
            <TouchableOpacity
                style={styles.singleButton}
                onPress={()=>this.setPageType("single")}
            > 
              <Text style={styles.singleText}>SINGLE PAGE</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.multiButton}
                onPress={()=>this.setPageType("multi")}
            > 
            <Text style={styles.multiText}>MULTIPLE PAGE</Text>
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
    singleButton: {
        width: '60%',
        height: getDevicePixel(10),
        marginTop: getDevicePixel(20),
        backgroundColor: '#0071BB',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: getDevicePixel(2)
    },
    singleText: {
        fontSize: 15,
        lineHeight: 16,
        color: '#fafafa'
    },

    multiButton:{
        width: '60%',
        height: getDevicePixel(10),
        marginTop: getDevicePixel(5),
        backgroundColor: '#0071BB',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: getDevicePixel(2)
    },

    multiText: {
        fontSize: 15,
        lineHeight: 16,
        color: '#fafafa'
    }
   
});
