import React, { Component } from 'react';
import {
    Platform,
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { getDevicePixel } from '@global';
import { setType, getPage } from '../global';
const options = {
	titile: "select a photo",
	takePhotoButtonTitle: 'Take a Photo',
	chooseFromLibraryButtonTitle: 'Choose from gallery',
	quality: 1,
	mediaType: 'photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}

const usericon = require('../img/usericon.png');

export default class Document extends Component {
  constructor(props){
    super(props);
    this.state = {
        selectImgae: '',
        filename: '',
        file_path: '',
        data: '',
        type: '',
        load: false
    }
    this.selectPhoto = this.selectPhoto.bind(this);
  }

  componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  componentWillUnmount() {

  }

    selectPhoto(type) {
        if (1 !== 1 ) {
            Alert.alert("Please signin")
        } 
        else 
        {
            setType(type);
            ImagePicker.showImagePicker(options, (response) => {
                // Alert.alert(JSON.stringify(response))
                if (response.didCancel) {
                        // console.log('User cancelled image picker');
                }
                else if (response.error) {
                        // console.log('ImagePicker Error: ', response.error);
                        return
                }
                else {
                    // Alert.alert("filename")
                    console.log("response");
                    console.log(response);
                    // console.error("file path++++++++========", response.path);
                    this.setState({ 
                        selectImgae: response.uri, 
                        file_path: response.path,
                        filename: ( response.fileName =='' || response.fileName == null ) ?  'image.jpg' : response.fileName,
                        data: response.data,
                        load: true
                    });
                    console.log(this.state.selectImgae);
                    console.log(this.state.data);
                    console.log(this.state.filename);
                    if (getPage() == 'single') {
                        this.props.navigation.navigate('PhotoScreen', 
                        {
                            selectImgae: this.state.selectImgae,
                            file_path: this.state.file_path,
                            filename: this.state.filename,
                            data: this.state.data,
                            type: this.state.type
                        })
                    } else {
                        this.props.navigation.navigate('PhotoMultiScreen', 
                        {
                            selectImgae: this.state.selectImgae,
                            file_path: this.state.file_path,
                            filename: this.state.filename,
                            data: this.state.data,
                            type: this.state.type
                        })
                    }
                    
                }
            })
        }
    }

  render() {
    return (
        <View style={styles.container}>       
            <Text style={{fontSize: 40, color: '#0097F5', marginTop: getDevicePixel(25)}}>Document type</Text>

            <Text style={{fontSize: 30, color: '#7B8D93', marginTop: getDevicePixel(15), textAlign: 'center'}}>please select type of document</Text>
        
            <TouchableOpacity
                style={[styles.singleButton, {marginTop: getDevicePixel(15)}]}
                onPress={()=> this.selectPhoto("sales")}
            > 
                <Image 
                    source = {usericon}
                    style = {styles.usericon}
                />
              <Text style={styles.singleText}>SALES INVOICE</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.singleButton}
                onPress={()=> this.selectPhoto("purchase")}
            > 
                <Image 
                    source = {usericon}
                    style = {styles.usericon}
                />  
              <Text style={styles.singleText}>PURCHASE RECEIPT</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.singleButton}
                onPress={()=> this.selectPhoto("bank")}
            >
                <Image 
                    source = {usericon}
                    style = {styles.usericon}
                />
              <Text style={styles.singleText}>BANK STATEMENT</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.singleButton}
                onPress={()=> this.selectPhoto("miscellaneous")}
            >
                <Image 
                    source = {usericon}
                    style = {styles.usericon}
                />
              <Text style={styles.singleText}>MISCELLANEOUS</Text>
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
        width: '80%',
        height: getDevicePixel(12),
        marginTop: getDevicePixel(1),
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
        fontSize: 17,
        lineHeight: 16,
        color: '#fafafa'
    },

    usericon: {
        width: getDevicePixel(9),
        height: getDevicePixel(9),
        marginLeft: getDevicePixel(2)
    }
   
});
