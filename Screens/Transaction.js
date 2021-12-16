import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'


const bgImage = require("../assets/images/background2.png");
const appIcon = require("../assets/images/appIcon.png");
const appName = require("../assets/images/appName.png");

export default class TransactionScreen extends Component {
constructor(props){
  super(props);
  this.state={
    buttonState:'normal',
    hasCameraPermissions:null,
    scanned:false,
    scannedbookid:'',
    scannedstudentid:''
  }
}


getCameraPermissions = async(id)=>{
  const {status} = await Permissions.askAsync(Permissions.CAMERA)
 // console.log(status)
 this.setState(
  {
    buttonState:id,
    hasCameraPermissions:status==='granted',
    scanned:false
  })
}

handleBarCodeScanner=async({type,data})=>{

  const {buttonState } = this.state
  if(buttonState === "bookId"){
    this.setState({
    buttonState:'normal',
    scannedbookid:data,
    scanned : true
   })
}
else if(buttonState === "studentId"){
  this.setState({
  buttonState:'normal',
  scannedstudentid:data,
  scanned : true
 })

}


  render() {
    const {buttonState, hasCameraPermissions, scanned, scannedData} = this.state;

     if(buttonState!=='normal' && hasCameraPermissions === true){
      return(
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner} style={StyleSheet.absoluteFillObject}>

        </BarCodeScanner>
      )
    }
    else{

      return (
        <View style={styles.container}>
          {/* <ImageBackground> */}
          <View style={styles.upperContainer}>
            <Image source = {appIcon} style={styles.appIcon} >
            <Image source = {appName} style={styles.appName} >
          </View>

          <View style={styles.LowerContainer}>
              <View style={styles.textinputContainer}>
               <TextInput 
                  style={styles.textInput}
                  placeHolder = {'Book Id'} 
                  placeHolderTextColor={'white'}
                  value={this.state.scannedBookId}
                >
                </TextInput>

                <TouchableOpacity style={styles.button} onPress={this.getCameraPermissions("BookId")}>
                  <Text style={styles.buttonText}>Click to Scan</Text>
                </TouchableOpacity>
                
              </View>
              <View  style={styles.textinputContainer}>
               
              <TextInput >
                  style={styles.textInput}
                  placeHolder = {'Student Id'} 
                  placeHolderTextColor={'white'}
                  value={this.state.scannedStudentId}
                  </TextInput> 

                <TouchableOpacity style={styles.button} onPress={this.getCameraPermissions("StudentId")}>
                  <Text style={styles.buttonText}>Click to Scan</Text>
                </TouchableOpacity>

              </View>
          </View>

          </ImageBackground>
        </View>
      )
    }
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop:50
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  appName: {
    width: 80,
    height: 80,
    marginBottom: 50,
    resizeMode: "contain"
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center",
    marginTop:50
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  }});