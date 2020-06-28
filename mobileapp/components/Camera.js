import React, {PureComponent} from 'react';
import { RNCamera } from 'react-native-camera';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

var imageArr = [];
exports.imageArr = imageArr;
var objectArr = []
exports.objectArr = objectArr;
var transArr = []
exports.transArr = transArr;

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      path: null,
    };
  }

  renderCamera() {
    console.log("Camera");
    return (
      <RNCamera
        ref={cam => {
          this.camera = cam;
        }}
        captureAudio={false}
        style={{flex: 1}}
        type={RNCamera.Constants.Type.back}>
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>Capture</Text>
      </RNCamera>
    );
  }

  renderImage() {

    console.log("HI", this.state.path);
     return (
       <View>
         <Image
           source={{ uri: this.state.path }}
           style={styles.preview}
         />
         <Text style={styles.capture} onPress={() => this.setState({ path: null })}>Retake</Text>
       </View>

     );
   }

   render() {
     return (
       <View style={styles.container}>
         {this.state.path ? this.renderImage() : this.renderCamera()}
       </View>
     );
   }

  takePicture = async () => {
    try {
      const data = await this.camera.takePictureAsync();
      this.setState({ path: data.uri });
      console.log(this.state);
      // this.props.updateImage(data.uri);
      console.log('Path to image: ' + data.uri);

      imageArr.push(data.uri);
      var objectArr = ['apple', 'tomato', 'sofa']
      var obj_list = [];
      for (i=0; i < objectArr.length; i++) {
        obj_list.push({"Text": objectArr[i]})
      }
      await fetch("https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=es", {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": "154d9fe476724f5384eb2e16efebc6ba",
          "Content-Type": "application/json; charset=UTF-8",
          "Ocp-Apim-Subscription-Region": "australiaeast"
        },
        body: JSON.stringify(obj_list)
      }).then(response => response.json())
      .then(json => {
        transArr.push(json[0].translations);
      });
      console.log(transArr)
      var obj_trans = transArr[0][0]["text"];
      var obj = "apple";
      fetch("https://flask-mongodb-app.azurewebsites.net/create?obj=" + obj + "&&trans=" + obj_trans);

      fetch("https://flask-mongodb-app.azurewebsites.net/see", {
        method: "GET"
      }).then(response => response.json())
      .then(json => {
        console.log(json);
      });

    } catch (err) {
      console.log('err: ', err);
    }
  };
}






//aspect={RNCamera.constants.Aspect.fill}>


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
