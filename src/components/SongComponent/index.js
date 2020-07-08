import React, { Component, Fragment } from "react";
import { View,Modal,ImageBackground,Image,TouchableHighlight,FlatList,Dimensions, Alert, BackHandler, AsyncStorage} from 'react-native';
import { Container, Header, Content,Form, Item, Input,Button,Separator,Title, Card, CardItem, Text, Icon,Left,Body,Right, Spinner,ListItem, Switch } from "native-base";
import {Actions} from 'react-native-router-flux';

export default class SongComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Modal 
            animationType="slide"
            transparent={true}
            presentationStyle="overFullScreen"
            // visible={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
              <View style={{ height:(SCREEN_HEIGHT*100)/100, backgroundColor : "transparent" }}>
                <View style={{
  marginTop: (SCREEN_WIDTH*30)/100,
  marginHorizontal:(SCREEN_WIDTH*5)/100,
  width:(SCREEN_WIDTH*90)/100,
  height:(SCREEN_HEIGHT*35)/100, 
  alignItems:"center", 
  backgroundColor:"#fff",
  borderRadius:20,
  shadowColor: "#000",
shadowOffset: {
width: 0,
height: 10,
},
shadowOpacity: 0.53,
shadowRadius: 13.97,

elevation: 21,
}}>  
                  <View style={{ width : "100%"}}>
                    <Button transparent style={{ width : "15%"}} onPress={()=>  this.setState({ modalVisible : false })} >
                        <Icon name='close' style={{ color :"#000" }}  />            
                    </Button>                
                  </View>             
                  <View style={{ height:"80%", width: "100%", justifyContent : "center", alignContent : "center" }}>
                   

                  </View>                  
                </View>
              </View>
          </Modal>
      </View>
    );
  }
}
