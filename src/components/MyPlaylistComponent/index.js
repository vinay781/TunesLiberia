import React, { Component } from 'react';
import {Modal,TouchableOpacity,Image,AsyncStorage,Dimensions, TouchableHighlight,Alert} from 'react-native';
import { Container, Header,Icon, Content, Card, CardItem, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, View } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from './style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class MyPlaylistComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      toolbar : false      
    };    
  }

  removeFomPlaylist(songid,playlistid){
    console.log("TL removeFomPlaylist : ", songid + playlistid);
    AsyncStorage.getItem('usertoken').then(res => {   
    var formData = new FormData();    
    formData.append("token", res);      
    formData.append("postid", songid); 
    formData.append("playlist_id", playlistid); 

    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/removeSongsfromPlaylists", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => { 
      console.log("TL removeFomPlaylist :", JSON.stringify(data))
      if(data.status=="ok")
      {          
        Actions.pop();           
        Alert.alert(
          "Success",
          "Song Removed from Playlist",
          [{
            text: "OK",
            style: "cancel"
            },                  
          ],
          { cancelable: true }
        )
      }       
    })
    .catch((error) => {         
      console.log("TL removeFomPlaylist ERROR : ", error);                 
      });
    });
  }

  render() {
    const {post_image,post_title,artist,music,post_id,post_file, post_playlist} = this.props
    const { toolbar } = this.state
  return (  
    <View key={post_id} style={{marginVertical:5,paddingHorizontal:10}}>
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
          <View style={{flexDirection:"row-reverse",justifyContent:"space-between",width:(SCREEN_WIDTH*12)/100}}>
            <Icon name='playlist-remove' type="MaterialCommunityIcons"  style={{ color :"#fff",fontSize: 20}} onPress={()=> Alert.alert(
              'Are You Sure?',
              'Remove '+post_title+' from Playlist', [{
                  text: 'No',
                  onPress: () => { console.log('SignIn Cancel Pressed') },
                  style: 'cancel'
              }, {
                  text: 'Yes',
                  onPress: () => {this.removeFomPlaylist(post_id,post_playlist)}
              }, ], {
                  cancelable: false
              }
            ) } />
            {/* <Icon name='dots-three-vertical' type="Entypo" style={{ color :"#fff",fontSize: 20}} onPress={()=> this.setState({ toolbar : true}) }  /> */}
          </View> 
        </Right>
      </ListItem>      
    </View>     
    );
  }
}