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
import RNDownloadButton from 'react-native-download-button';  
import ReactDOM from 'react-dom';


var imageArr = [];
exports.imageArr = imageArr;
var objectArr = []
exports.objectArr = objectArr;
var transArr = []
exports.transArr = transArr;
var dataList = [];
exports.dataList = dataList;

var processing = false;
exports.processing = processing;

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
        style={{flex: 1}}>
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
    processing = true;
    try {
      const data = await this.camera.takePictureAsync();
      console.log(data);
      this.setState({ path: data.uri });
      console.log(this.state);
      // this.props.updateImage(data.uri);
      console.log('Path to image: ' + data.uri);

      imageArr.push(data.uri);

      var image_urls = ["https://freshome.com/wp-content/uploads/2017/06/wall-multipurpose.jpg",
      "https://www.thespruce.com/thmb/0qJKb8sMZuyUVNnMeytwUBoyIY0=/2121x1414/filters:fill(auto,1)/Whitemodernkitchen-GettyImages-1089101352-4eddd67a46984affa521c889b02c5bf1.jpg",
       "https://www.thertastore.com/rta-blog/wp-content/uploads/2019/02/2-22-19-RTA1-Roosevelt-Dove-Gray.jpeg"
      ]

      //START
      var urlbody = {"url": image_urls[0]}
      await fetch("https://computervisionobjectdetection.cognitiveservices.azure.com/vision/v3.0/detect", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Ocp-Apim-Subscription-Key": "b2db4783899546faba4bdefbc70b4e5f",
          "Ocp-Apim-Subscription-Region": "westus2"
        },
        body: JSON.stringify(urlbody)
      }).then(response => response.json())
      .then(json => {
        for (i=0; i< json.objects.length; i++) {
          objectArr.push(json.objects[i].object);
        }
      });

      var urlbody = {"url": image_urls[1]}
      await fetch("https://computervisionobjectdetection.cognitiveservices.azure.com/vision/v3.0/detect", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Ocp-Apim-Subscription-Key": "b2db4783899546faba4bdefbc70b4e5f",
          "Ocp-Apim-Subscription-Region": "westus2"
        },
        body: JSON.stringify(urlbody)
      }).then(response => response.json())
      .then(json => {
        for (i=0; i< json.objects.length; i++) {
          objectArr.push(json.objects[i].object);
        }
      });

      var urlbody = {"url": image_urls[2]}
      await fetch("https://computervisionobjectdetection.cognitiveservices.azure.com/vision/v3.0/detect", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Ocp-Apim-Subscription-Key": "b2db4783899546faba4bdefbc70b4e5f",
          "Ocp-Apim-Subscription-Region": "westus2"
        },
        body: JSON.stringify(urlbody)
      }).then(response => response.json())
      .then(json => {
        for (i=0; i< json.objects.length; i++) {
          objectArr.push(json.objects[i].object);
        }
      });
      //END

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
        //body: JSON.stringify([{"Text": "dormer window"}])
      }).then(response => response.json())
      .then(json => {
        console.log("translation", json)
        for (i=0; i < json.length; i++) {
          transArr.push(json[i].translations);
        }
      });
      console.log("transArr", transArr)

      //const forLoop = async _ => {
      for (i=0; i < objectArr.length; i++) {
        var obj_trans = transArr[i][0]["text"];
        var obj = objectArr[i];
        await fetch("https://flask-mongodb-app.azurewebsites.net/create?obj=" + obj + "&&trans=" + obj_trans);
      }
      //}

      await fetch("https://flask-mongodb-app.azurewebsites.net/see", {
        method: "GET"
      }).then(response => response.json())
      .then(json => {
        dataList.push(json);
      });
      console.log("json now", dataList)

    } catch (err) {
      console.log('err: ', err);
    }
    processing = false;
  };
}








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
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 60,
    marginTop: 650
  }
});