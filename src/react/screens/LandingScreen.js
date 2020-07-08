import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {Actions} from 'react-native-router-flux';
import Screen from "../components/Screen";

export default class LandingScreen extends Screen {
  static navigationOptions = {
    title: "React Native Track Player"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Example Demos</Text>
        <TouchableOpacity onPress={() => Actions.jump('playlistscreen')}>
          <Text>Playlist Example</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  header: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center"
  }
});
