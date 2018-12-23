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


export default class Photo extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    const { navigation } = this.props;
    this.selectImgae = navigation.getParam('selectImgae');
    this.filename = navigation.getParam('filename');
    this.data = navigation.getParam('data');
  }

  componentWillMount() {
  }
  
  componentDidMount() {
    console.log("selectImage",this.selectImgae);
    // console.log(this.state.data);
    console.log("filename", this.filename);
  }
  
  componentWillUnmount() {

  }



  render() {
    return (
        <View style={styles.container}>       
            <Image 
                source = {{uri: this.selectImgae}}
                style = {{width: '98%', height: '85%', marginTop: getDevicePixel(1)}}
                resizeMode = 'stretch'
            />

            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                style={[styles.singleButton, {marginRight: getDevicePixel(8)}]}
                onPress={()=>this.props.navigation.navigate('DocumentScreen')}
            > 
              <Text style={styles.singleText}>Back</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={styles.singleButton}
                onPress={()=>this.props.navigation.navigate('EditScreen', {
                    selectImgae: this.selectImgae, 
                    filename: this.filename, 
                    data: this.data,
                })}
            > 
              <Text style={styles.singleText}>Edit File Info</Text>
            </TouchableOpacity>
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
    singleButton: {
        width: getDevicePixel(30),
        height: getDevicePixel(10),
        marginTop: getDevicePixel(6),
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
