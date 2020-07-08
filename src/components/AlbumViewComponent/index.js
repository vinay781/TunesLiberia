import React, { Component } from 'react';
import {ImageBackground,TouchableOpacity,Image,AsyncStorage,BackHandler,Dimensions, Alert} from 'react-native';
import { Container, Header,Icon, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, View } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class AlbumViewComponent extends Component {
  render() {
      const {title,content,image,categories,file_url} = this.props
    return (
      
           <View style={{marginVertical:5,paddingHorizontal:10}}>
               <ListItem thumbnail noBorder >
              <Left>
                <Thumbnail  square source={{ uri:image }} style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}} />
              </Left>
              <Body>
                <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>{title}</Text>
                <Text note numberOfLines={1} style={{fontWeight:'bold'}}>{content}</Text>
              </Body>
              <Right>
                <View style={{flexDirection:"row",justifyContent:"space-between",width:(SCREEN_WIDTH*12)/100}}>
                  <Icon name='arrow-collapse-down' type="MaterialCommunityIcons"  style={{ color :"#fff",fontSize: 20}} onPress={()=> Alert.alert("Purchase?")} />
                  <Icon name='more-v-a' type="Fontisto" style={{ color :"#fff",fontSize: 20}}  />
                </View>              
              </Right>
            </ListItem>
           </View>          
        
      
    );
  }
}