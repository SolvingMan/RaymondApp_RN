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


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
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
            <Text style={{fontSize: 30, color: '#7B8D93', marginTop: getDevicePixel(25)}}>Hi Divve</Text>
            <Text style={{fontSize: 35, color: '#0097F5'}}>Let's get Started... </Text>

            <Text style={{fontSize: 24, color: '#7B8D93', marginTop: getDevicePixel(15)}}>Lets scan the paperwork</Text>
        
            <TouchableOpacity
                style={styles.singleButton}
            > 
              <Text style={styles.singleText}>SINGLE PAGE</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.multiButton}
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
