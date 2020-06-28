import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  FlatList
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from './components/Camera';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

var CameraPage = require('./components/Camera');
var imageArr = CameraPage.imageArr;
var dataList = CameraPage.dataList;

const Stack = createStackNavigator();
class App extends Component {
 render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '' }}
          style = {page.container}
        />
        <Stack.Screen
          name="PicturePage"
          component={PicturePage}
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
      <View style = {page.homepage}>
        <Text style={page.title}>Findling</Text>

      <View style={[{width: "50%", marginLeft:100, marginTop: 30}]}>
        <Button
        color="white"
        title= "Start game setup!"
        type="solid"
        icon={
          <Icon
            name="arrow-right"
            size={20}
            color="white"
          />
          }
        onPress={() =>
          navigation.navigate('PicturePage', {name: 'PicturePage'})
          }
        />
      </View>
    </View>
  );
}

function PicturePage({navigation}) {
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
  )
}

function GamePage({ route, navigation }) {
  console.log("game page data",  dataList[0]);
  console.log("images",  imageArr);
  return (
    <View>
        <FlatList
          data={dataList[0]}
          renderItem={({item}) =>
            <Button
            buttonStyle={page.button}
            color="white"
            title= {item[1]}
            titleStyle={page.item}
            type="solid"
            icon={
              <Icon
                name="arrow-right"
                size={20}
                color="white"
              />}
          />}
        />
    </View>
  )
}

const page = StyleSheet.create({
  button: {
    margin: 15,
    backgroundColor: "#51c9ed",
    padding: 20
  },
  item: {
    color: 'white',
    borderRadius: 2,
    fontSize: 40,
    height: 44,
  },
  homepage : {
    backgroundColor: "#51c9ed",
    flex: 1,
  },
  title : {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    color: "#000",
    textAlign: 'center',
    marginTop: 200

  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center"
  },
  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold"
  }
})

export default App;
