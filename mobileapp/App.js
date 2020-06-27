import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from './components/Camera';

var CameraPage = require('./components/Camera');
var imageArr = CameraPage.imageArr;

const Stack = createStackNavigator();
class App extends Component {
 render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Take a picture!' }}

        />
        <Stack.Screen
          name="GamePage"
          component={GamePage}
          options={{title: 'GamePage'}}
          />
      </Stack.Navigator>
    </NavigationContainer>
      )
  }
}

function HomeScreen({ navigation }) {
  return (
    <>
      <Camera />

      <Button
        title="Go to the game page"
        onPress={() =>
          navigation.navigate('GamePage', { name: 'GamePage'})
        }
      />
    </>

  );
}
function GamePage({ route, navigation }) {

  console.log("printing", imageArr);
  return (
    <Text>{JSON.stringify(imageArr)}</Text>
  );
}


export default App;
