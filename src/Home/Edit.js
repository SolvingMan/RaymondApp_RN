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


export default class Edit extends Component {
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
            <Text style={styles.title}>Edit File Info</Text>
            <TextInput 
                style={styles.text}
                placeholder="Insert info..."
                placeholderTextColor = '#a6a6a6'
                autoCapitalize='none'
                ref="email"
                multiline = {true}
                numberOfLines = {5}
                onChangeText={(email) => this.setState({email})} 
                
            
            />

            <TouchableOpacity
                style={styles.singleButton}
                onPress={()=>this.props.navigation.navigate('DocumentScreen')}
            > 
              <Text style={styles.singleText}>Save and Submit</Text>
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
    title: {
        fontSize: 30,
        color: '#0071BB',
        marginTop: getDevicePixel(10)
    },
    text: {
        width: '90%',
        height: '30%',
        padding: getDevicePixel(3),
        marginTop: getDevicePixel(10),
        fontSize: 20,
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderRadius: getDevicePixel(1)
    },
    singleButton: {
        width: '40%',
        height: getDevicePixel(12),
        marginTop: getDevicePixel(5),
        backgroundColor: '#0071BB',
        padding: 0,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: getDevicePixel(2)
    },
    singleText: {
        fontSize: 18,
        // fontWeight: 'bold',
        lineHeight: 17,
        marginLeft: getDevicePixel(2),
        color: '#fafafa'
    },
   
});
