import React, { Component } from 'react';
import {Image,AsyncStorage,Dimensions, TouchableHighlight,Alert} from 'react-native';
import { Container, Header,Icon, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, View } from 'native-base';
import {Actions} from 'react-native-router-flux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class FavListComponent extends Component {

  unFavouriteSong(id){
    console.log("TL unFavouriteSong", id );
    AsyncStorage.getItem('usertoken').then(res => {    
      console.log("TL unFavouriteSong token : ", res )  
      var formData = new FormData();    
      formData.append("token", res );    
      formData.append("postid", id ); 

      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/removefavourites", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => { 
        console.log("TL unFavouriteSong :", JSON.stringify(data)) 
        if(data.status=="ok")
        {  
          Actions.pop();                   
          Alert.alert(
            "",
            "Successfully Removed",
            [{
              text: "OK",
              style: "cancel",
              onPress: () => { Actions.jump('favourites') }
              },                  
            ],
            { cancelable: true }
          )
        }       
      })
      .catch((error) => {         
        console.log("TL unFavouriteSong ERROR : ", error);                 
      });
    }); 
    
  }

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
                <Button transparent                 
                    onPress={()=> Alert.alert(
                      'Are You Sure?',
                      'Unfavorite '+post_title, [{
                          text: 'No',
                          onPress: () => { console.log('SignIn Cancel Pressed') },
                          style: 'cancel'
                      }, {
                          text: 'Yes',
                          onPress: () => { this.unFavouriteSong(post_id) }
                      }, ], {
                          cancelable: false
                      }
                    ) } 
                  >
                    <Icon name='trash' type="FontAwesome" style={{ color :"#fff",fontSize: 15}}  />
                </Button> 
              </Right>
            </ListItem>
           </View>       
      
    );
  }
}