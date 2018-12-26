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
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';


export default class Photo extends Component {
  constructor(props){
    super(props);
    this.state = {
        filepath: '',
        selectImgae: this.props.navigation.getParam('selectImgae'),
        filename: this.props.navigation.getParam('filename'),
        data: this.props.navigation.getParam('data'),
    }
  }

  componentWillMount() {
  }
  
  async componentDidMount() {
    console.log("selectImage",this.state.selectImgae);
    // console.log(this.state.data);
    console.log("filename", this.state.filename);
    const jpgPath = (this.state.selectImgae).substring(7);
    const page1 = PDFPage
    .create()
    .setMediaBox(210, 297)
    .drawImage(jpgPath, 'jpg', {
        x: 5,
        y: 15,
        width: 200,
        height: 230,
    })
    const docsDir = await PDFLib.getDocumentsDirectory()
    const pdfPath = `${docsDir}/sample.pdf`
    PDFDocument
    .create(pdfPath)
    .addPages(page1)
    .write() // Returns a promise that resolves with the PDF's path
    .then(path => {
        console.log('PDF created at: ' + path);
        // Do stuff with your shiny new PDF!
        this.setState({filepath: path});   
    });
  }
  
  componentWillUnmount() {

  }



  render() {
    return (
        <View style={styles.container}>       
            <Image 
                source = {{uri: this.state.selectImgae}}
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
                    filepath: this.state.filepath
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
