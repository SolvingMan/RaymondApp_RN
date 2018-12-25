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
        path: ''
    }
    const { navigation } = this.props;
    this.selectImgae = navigation.getParam('selectImgae');
    this.filename = navigation.getParam('filename');
    this.data = navigation.getParam('data');

    this.save = this.save.bind(this);
    this.saveSingle = this.saveSingle.bind(this);
    // this.saveMulti = this.saveMulti.bind(this);
    this.NextPhoto = this.NextPhoto.bind(this);
  }

  componentWillMount() {
  }
  
  componentDidMount() {

  }
  
  componentWillUnmount() {

  }

  async save() {
        if (getPage() == 'single') {
            this.saveSingle();
        }
        else {
            this.saveMulti();
        }
  }

  async saveMulti() {
    if (this.state.caption == '' ) {
        Alert.alert("Please insert \n description");
        console.log(this.state.caption);
        return;
    }
    if (get_flag_pdf() !== 'pdf') {
        set_flag_pdf('pdf');
        console.log(get_flag_pdf(),"++++++++++++++++==")
        const jpgPath = (this.selectImgae).substring(7);
        const page1 = PDFPage
        .create()
        .setMediaBox(210, 297)
        .drawText(this.state.caption)
        .drawImage(jpgPath, 'jpg', {
            x: 5,
            y: 15,
            width: 200,
            height: 230,
        })
        const docsDir = await PDFLib.getDocumentsDirectory()
        const pdfPath = `${docsDir}/sample1.pdf`
        PDFDocument
        .create(pdfPath)
        .addPages(page1)
        .write() // Returns a promise that resolves with the PDF's path
        .then(path => {
            console.log('PDF created at: ' + path);
            // Do stuff with your shiny new PDF!
            var data = new FormData();
            data.append('email', getUser().email);
            data.append('caption', this.state.caption);
            data.append('type', "PDF");
            data.append('upload_file', {
                uri: "file://"+path,
                name: "sample.pdf",
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
        });
        set_flag_pdf('');
       
    }
    else {
        console.log("doublesdafsadfsdf")
    const jpgPath = (this.selectImgae).substring(7);
    const page1 = PDFPage
    .create()
    .setMediaBox(210, 297)
    .drawText(this.state.caption)
    .drawImage(jpgPath, 'jpg', {
        x: 5,
        y: 15,
        width: 200,
        height: 230,
    })
    const docsDir = await PDFLib.getDocumentsDirectory()
    const pdfPath = `${docsDir}/sample1.pdf`
    PDFDocument
    .modify(pdfPath)
    .addPages(page1)
    .write() // Returns a promise that resolves with the PDF's path
    .then(path => {
        console.log('PDF created at: ' + path);
        // Do stuff with your shiny new PDF!
        // this.setState({path: path})
        var data = new FormData();
        data.append('email', getUser().email);
        data.append('caption', this.state.caption);
        data.append('type', "PDF");
        data.append('upload_file', {
            uri: "file://"+path,
            name: "sample.pdf",
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
    });
    set_flag_pdf('');
    }
  }

  saveSingle() {
    console.log(this.selectImgae);
    if (this.state.caption == '' ) {
        Alert.alert("Please insert \n description");
        console.log(this.state.caption);
        return;
    }
    // this.setState({loading: true});
    console.log(getType());
    var data = new FormData();
    data.append('email', getUser().email);
    data.append('caption', this.state.caption);
    data.append('type', getType());
    data.append('upload_file', {
        uri: this.selectImgae,
        name: this.filename,
        type: 'image/jpg',
        data: this.data
    });
    console.log(data);
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

  async NextPhoto() {
    if (this.state.caption == '' ) {
        Alert.alert("Please insert \n description");
        console.log(this.state.caption);
        return;
    }
      console.log(get_flag_pdf(),"******************************")
      if (get_flag_pdf() !== 'pdf') {
        set_flag_pdf('pdf');
        console.log(get_flag_pdf(),"++++++++++++++++==")
        const jpgPath = (this.selectImgae).substring(7);
        const page1 = PDFPage
        .create()
        .setMediaBox(210, 297)
        .drawText(this.state.caption)
        .drawImage(jpgPath, 'jpg', {
            x: 5,
            y: 15,
            width: 200,
            height: 230,
        })
        const docsDir = await PDFLib.getDocumentsDirectory()
        const pdfPath = `${docsDir}/sample1.pdf`
        PDFDocument
        .create(pdfPath)
        .addPages(page1)
        .write() // Returns a promise that resolves with the PDF's path
        .then(path => {
            console.log('PDF created at: ' + path);
            // Do stuff with your shiny new PDF!
            // this.setState({path: path});
        });
       
      }
      else {
          console.log("doublesdafsadfsdf")
        const jpgPath = (this.selectImgae).substring(7);
        const page1 = PDFPage
        .create()
        .setMediaBox(210, 297)
        .drawText(this.state.caption)
        .drawImage(jpgPath, 'jpg', {
            x: 5,
            y: 15,
            width: 200,
            height: 230,
        })
        const docsDir = await PDFLib.getDocumentsDirectory()
        const pdfPath = `${docsDir}/sample1.pdf`
        PDFDocument
        .modify(pdfPath)
        .addPages(page1)
        .write() // Returns a promise that resolves with the PDF's path
        .then(path => {
            console.log('PDF created at: ' + path);
            // Do stuff with your shiny new PDF!
            // this.setState({path: path})
        });
      }
      this.props.navigation.navigate("DocumentScreen");
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
                    onPress={()=>this.props.navigation.navigate('PhotoScreen')}
                > 
                <Text style={styles.singleText}>Back</Text>
                </TouchableOpacity> 

               { (getPage() == 'single') ?
                <View style={[styles.singleButton, {marginRight: getDevicePixel(3), backgroundColor: 'grey'}]}
                > 
                <Text style={styles.singleText}>Next</Text>
                </View>
                :
                <TouchableOpacity
                    style={[styles.singleButton, {marginRight: getDevicePixel(3)}]}
                    onPress={this.NextPhoto}
                > 
                <Text style={styles.singleText}>Next</Text>
                </TouchableOpacity>
                }
           
            </View>
            { this.state.loading ?
            <View
                    style={styles.singleButton}
                > 
                    <ActivityIndicator size="small" />
                </View>
                :
                <TouchableOpacity
                    style={styles.singleButton}
                    onPress={this.save}
                > 
                <Text style={styles.singleText}>Save and Submit</Text>
                </TouchableOpacity> }
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
