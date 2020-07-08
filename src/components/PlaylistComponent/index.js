import React, { Component } from 'react';
import {ImageBackground,TouchableOpacity,Image,AsyncStorage,BackHandler,Dimensions, TouchableHighlight,Alert} from 'react-native';
import { Container, Header,Icon, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, View } from 'native-base';
import {Actions} from 'react-native-router-flux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PlaylistComponent extends Component {

  removePlaylist(id, userid){
    console.log("TL remove", id + userid);
    AsyncStorage.getItem('usertoken').then(res => {    
      console.log("TL token : ", res )  
      
      var formData = new FormData();    
      formData.append("token", res );      
      formData.append("playlist_id", id ); 

      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/removePlaylistByuser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => { 
        console.log("TL removePlaylist :", JSON.stringify(data)) 
        if(data.status=="ok")
        {          
          // Actions.refresh({ key: 'myplaylists'}); 
          Actions.pop();           
          Alert.alert(
            "Success",
            "Playlist Removed",
            [{
              text: "OK",
              style: "cancel",
              onPress: () =>  Actions.jump('myplaylists')
              },                  
            ],
            { cancelable: true }
          )
        }       
      })
      .catch((error) => {         
        console.log("TL removePlaylist ERROR : ", error);                 
      });
    }); 
    
  }
  renderDate(post_date)
  {
    var d = new Date(post_date);
    // var day = d.getDay();
    var date = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    return month + '/' + date + '/' + d.getFullYear();
  }

  render() {
    const { post_id, post_userid, post_title, post_date } = this.props
    return (      
      <View style={{marginVertical:5,paddingHorizontal:10}}>
          <ListItem thumbnail noBorder >              
        <Left>
          <Thumbnail square source={require("../../assets/images/playlist.png")} style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}} />
        </Left>
        <Body>
          <TouchableHighlight activeOpacity={0.6} onPress={()=>Actions.jump('myplaylistsong',{ playlistid : post_id })}>
            <View>
              <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>{post_title}</Text>
              <Text note numberOfLines={1} style={{fontWeight:'bold'}}>{this.renderDate(post_date)}</Text>
            </View>
          </TouchableHighlight>
        </Body>
        
        <Right>
          {/* <View style={{flexDirection:"row"}}>
            <Icon name='trash' type="FontAwesome" style={{ color :"#fff",fontSize: 20}}  />
          </View> */}
          <Button transparent                 
            onPress={()=>  Alert.alert(
              'Are You Sure?',
              'Remove '+post_title, [{
                  text: 'No',
                  onPress: () => { console.log('SignIn Cancel Pressed') },
                  style: 'cancel'
              }, {
                  text: 'Yes',
                  onPress: () => {this.removePlaylist(post_id,post_userid)}
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