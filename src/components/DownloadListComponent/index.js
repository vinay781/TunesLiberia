import React, { Component } from 'react';
import {ImageBackground,TouchableOpacity,Image,AsyncStorage,BackHandler,Dimensions, TouchableHighlight,Alert} from 'react-native';
import { Container, Header,Icon, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, View } from 'native-base';
import {Actions} from 'react-native-router-flux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class DownloadListComponent extends Component {
  render() {
      const {post_image,post_title,artist,music,post_id,post_file} = this.props
    return (
      
           <View style={{marginVertical:5,paddingHorizontal:10}}>
               <ListItem thumbnail noBorder >              
              <Left>
                <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title }})}>
                  <Thumbnail  square source={{ uri:post_image }} style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}} />
                </TouchableHighlight>
              </Left>
              <Body>
              <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title }})}>
                <View>
                  <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>{post_title}</Text>
                  <Text note numberOfLines={1} style={{fontWeight:'bold'}}>{artist}</Text>
                </View>
              </TouchableHighlight>
              </Body>
              
              <Right>
                <View style={{flexDirection:"row"}}>
                  <Icon name='dots-three-vertical' type="Entypo" style={{ color :"#fff",fontSize: 20}}  />
                </View>
              </Right>
            </ListItem>
           </View>      
        
      
    );
  }
}