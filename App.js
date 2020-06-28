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
var processing = CameraPage.processing;
var

class ButtonState extends Component {
  constructor(props: Props) {
        super(props);
        this.state = {
          buttonState: 0,
        };
        this.toggle = this.toggle.bind(this);
    };

  toggle() {
    this.state = {
      buttonState: 1
    }
  }

  render() {
    const { item } = this.props;

  return(
    <Button
    buttonStyle={(this.state.buttonState== 1)?page.buttonActive:page.button}
    color="white"
    title= {item.text}
    titleStyle={page.item}
    type="solid"
    icon={
      <Icon
        name="star"
        size={20}
        colors="white"
      />}
    onPress={this.toggle}
  />
  )

}
}

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
          options={{title: 'Try and find them ALL!'}}
          />
      </Stack.Navigator>
    </NavigationContainer>
      )

  }
}

function HomeScreen({ navigation }) {
  return (
      <View style = {page.homepage}>
        <Image
          source={require('./ducky.png')}
          style={{ width: 150, height: 150, marginLeft:130, marginTop: 200}}
        />
        <Text style={page.title}>f i n d l i n g</Text>

      <View style={[{width: "50%", marginLeft:100}]}>
        <Button
        color="white"
        title= "START ADVENTURE  "
        type="solid"
        iconRight
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
  if (processing == 1) {
    return (
    <>
      <Camera />
    </>
    )
  } else {
    return (
    <>
      <Camera />
      <Button
        title="GO TO GAME PAGE  "
        onPress={() =>
          navigation.navigate('GamePage', { name: 'GamePage'})
        }
        iconRight
        icon={
          <Icon
            name="arrow-right"
            size={20}
            color="white"
          />
          }
      />
    </>
    )
  }
}

//console.log("before",  dataList[0]);
//console.log("images",  imageArr);
//dataList = [[["orange", "naranja", 0], ["apple", "manzana", 0], ["tomato", "Tomate", 0], ["sofa", "Sofá", 0], ["dormer window", "ventana dormida", 0], ["Sofa bed", "Sofá cama", 0], ["chair", "Silla", 0], ["oven", "Horno", 0], ["seating", "Asientos", 0], ["television", "Televisión", 0], ["couch", "Sofá", 0]]];
function GamePage({ route, navigation }) {
  console.log("game page data",  dataList[0]);
  console.log("images",  imageArr);
  state = {
    btnSelected: 0
  }
  return (
    <View>

        <FlatList
          data={dataList[0]}
          renderItem={({item}) =>
          <ButtonState item={{text: item[1]}}/>
          }
        />
    </View>
  )
}

const page = StyleSheet.create({
  button: {
    marginHorizontal: 30,
    justifyContent:'flex-start',
    margin:10,
    borderRadius: 10,
    backgroundColor: "#51c9ed"
  },
  item: {
    color: 'white',
    borderRadius: 2,
    margin: 10,
    marginLeft: 20,
    fontSize: 30,
    height: 40
  },
  homepage : {
    backgroundColor: "#51c9ed",
    flex: 1
  },
  title : {
    color: "white",
    fontSize: 55,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 10
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
  },
  buttonActive: {
    margin: 15,
    backgroundColor: "#000",
    padding: 20
  }
})

export default App;
