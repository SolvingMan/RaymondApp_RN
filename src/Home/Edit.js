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
    ActivityIndicator,
    Keyboard
} from 'react-native';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

import { getDevicePixel, getUser, getType, getPage, set_flag_pdf, get_flag_pdf } from '../global';


export default class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
        caption: '',
        loading: false,
        filepath: this.props.navigation.getParam('filepath')
    }

    this.save = this.save.bind(this);
    this.back = this.back.bind(this);
  }

  componentWillMount() {
      console.log("filepath***************", this.state.filepath)
  }
  
  componentDidMount() {

  }
  
  componentWillUnmount() {

  }

  back() {
      console.log(getPage());
      if (getPage() == 'single') {
        this.props.navigation.navigate('PhotoScreen');
      }
      else {
        console.log("dfsadfsdf+++_____");
        this.props.navigation.navigate('PhotoMultiScreen');
      }
  }

  save() {
    if (this.state.caption == '' ) {
        Alert.alert("Please insert \n description");
        console.log(this.state.caption);
        return;
    }
    var data = new FormData();
    data.append('email', getUser().email);
    data.append('caption', this.state.caption);
    data.append('type', getType());
    data.append('upload_file', {
        uri: "file://"+this.state.filepath,
        name: "sample.pdf",
        type: 'image/jpg'
    });
    console.log(data)
    this.setState({loading: true});
    fetch("http://raymondray111.raytax.co.uk/public/api/user/upload_file", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body : data
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(data);
    if (responseJson.result === "success") {
        Alert.alert("File has been successfully submitted");
        this.props.navigation.navigate('HomeScreen');
    } else {
        Alert.alert("Upload Failed");
    } 
    console.log(responseJson);
    this.setState({loading: false});
    }).catch((error) => {
        console.log(error);
        this.setState({loading: false});
        return;
    });
  }

  render() {
    return (
        <TouchableOpacity 
            onPress={()=>Keyboard.dismiss()}
            style={styles.container}>       
            <Text style={styles.title}>Edit File Info</Text>
            <TextInput 
                style={styles.text}
                placeholder="Insert info..."
                placeholderTextColor = '#a6a6a6'
                autoCapitalize='none'
                ref="caption"
                multiline = {true}
                numberOfLines = {5}
                onChangeText={(caption) => this.setState({caption})} 
            />
            <View style={{flexDirection: 'row'}}>

                <TouchableOpacity
                    style={[styles.singleButton, {marginRight: getDevicePixel(3)}]}
                    onPress={this.back}
                > 
                <Text style={styles.singleText}>Back</Text>
                </TouchableOpacity> 

                { this.state.loading ?
                <View style={styles.singleButton}> 
                    <ActivityIndicator size="small" />
                </View>
                :
                <TouchableOpacity
                    style={styles.singleButton}
                    onPress={this.save}
                > 
                    <Text style={styles.singleText}>Save and Submit</Text>
                </TouchableOpacity> 
                }
            </View>
            
        </TouchableOpacity>
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
        marginTop: getDevicePixel(4)
    },
    text: {
        width: '90%',
        height: '30%',
        padding: getDevicePixel(3),
        marginTop: getDevicePixel(4),
        fontSize: 20,
        backgroundColor: '#F3F3F3',
        borderWidth: 1,
        borderRadius: getDevicePixel(1)
    },
    singleButton: {
        width: '40%',
        height: getDevicePixel(12),
        marginTop: getDevicePixel(3),
        backgroundColor: '#0071BB',
        padding: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
