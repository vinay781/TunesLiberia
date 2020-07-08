import React, { Component } from 'react';
import {ImageBackground,TouchableOpacity,Image,AsyncStorage,BackHandler,Dimensions, TouchableHighlight,Alert} from 'react-native';
import { Container, Header,Icon, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, View, Toast } from 'native-base';
import {Actions} from 'react-native-router-flux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class AddToPlaylistComponent extends Component {

  addToPlaylist(playlistid, trackid){
    console.log("songPlaylist addto playlistid : ", playlistid + ' trackid : ' + trackid);
    AsyncStorage.getItem('usertoken').then(res => {    
      // console.log("TL token : ", res )  
      var formData = new FormData();  

      formData.append("token", res );     
      formData.append("playlist_id", playlistid ); 
      formData.append("postid", trackid ); 

      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/addToplaylists", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => { 
        console.log("TL removePlaylist :", JSON.stringify(data)) 
        if(data.status=="ok")
        {          
          Toast.show({
            text: data.msg,
            duration: 1500           
          })
        }  
        else
        {
          Toast.show({
            text: data.msg,  
            duration: 1500          
          })
        }      
      })
      .catch((error) => {         
        console.log("TL removePlaylist ERROR : ", error);   
        Toast.show({
          text: "Connection issue.."        
        })                 
      });
    }); 
    
  }


  render() {
      const { post_id,post_userid,post_title,post_date, post_trackid } = this.props
    return (
      
           <View style={{marginVertical:5,paddingHorizontal:10}}>
               <ListItem thumbnail noBorder >              
              <Left>
                <Thumbnail square source={require("../../assets/images/playlist.png")} style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}} />
              </Left>
              <Body>
                {/* <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('myplaylistsong',{ playlistid : post_id })}> */}
                  <View>
                    <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>{post_title}</Text>
                    <Text note numberOfLines={1} style={{fontWeight:'bold'}}>{post_date}</Text>
                  </View>
                {/* </TouchableHighlight> */}
              </Body>
              
              <Right>
                {/* <View style={{flexDirection:"row"}}>
                  <Icon name='trash' type="FontAwesome" style={{ color :"#fff",fontSize: 20}}  />
                </View> */}
                <Button transparent                 
                  onPress={()=> this.addToPlaylist(post_id,post_trackid)} 
                >
                  <Icon name='add-to-list' type="Entypo" style={{ color :"#fff",fontSize: 15}}  />
                </Button>  
              </Right>
            </ListItem>
           </View>      
        
      
    );
  }
}