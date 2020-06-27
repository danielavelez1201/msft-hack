import React, {PureComponent} from 'react';
import { RNCamera } from 'react-native-camera';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
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

  takePicture = async () => {
    try {
      const data = await this.camera.takePictureAsync();
      this.setState({ path: data.uri });
      // this.props.updateImage(data.uri);
       console.log('Path to image: ' + data.uri);
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
    alignItems: 'center'
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
