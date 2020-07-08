import React, { Component,useState ,useEffect } from 'react';
import {Image,AsyncStorage,Dimensions, TouchableHighlight,Alert, Platform} from 'react-native';
import { Container, Header, Content,View, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,Icon } from 'native-base';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player'
import theme from '../../config/theme';
import {Actions} from 'react-native-router-flux';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function MiniPlayer(props) {
  const playbackState = usePlaybackState(); 
  

  const [trackTitle, setTrackTitle] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackPlayble, setTrackPlayble] = useState();
  const [trackShow, setTrackShow] = useState();
  
  useEffect(() => {
    setup();
  }, []); 
  
  setTimeout(() => {
   setup();
  }, 1)  
    async function setup(data,currentmusic) {
    const currentTrack = await TrackPlayer.getCurrentTrack();  
   
    console.log("togglePlaybackmini: ", currentTrack)
    const currentstate = await TrackPlayer.getTrack(currentTrack);
    console.log("getstate",currentstate.artwork)
    console.log("current") 
    if(currentstate==null) {
         setTrackShow(false)
    }
    else{
      setTrackShow(true)
    }
    setTrackArtwork(currentstate.artwork)
    setTrackTitle(currentstate.title)
    setTrackArtist(currentstate.artist)
    setTrackPlayble(playbackState)

  }
  
  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();    
    console.log("togglePlayback : ", currentTrack)
    const currentstate = await TrackPlayer.getTrack(currentTrack);
    console.log("getstate",currentstate.artwork)
    setTrackArtwork(currentstate.artwork)
    setTrackTitle(currentstate.title)
    setTrackArtist(currentstate.artist)
      if(playbackState === TrackPlayer.STATE_PAUSED) 
      {
        console.log("3")
        await TrackPlayer.play();
      }
      else
      {
        console.log("4")
        await TrackPlayer.pause();
      }
    
  } 
    return (           

      <View style={{ backgroundColor : "transparent", width : (SCREEN_WIDTH*100)/100, height : 80,marginBottom : 0.5}}>
        {trackShow && <ListItem thumbnail noBorder style={{backgroundColor:theme.PINK_COLOR}} >              
        <Left>
        <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.push('playlistscreen')}>
        <Thumbnail square source={{ uri: trackArtwork }}  style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100,marginLeft:3}} />
          </TouchableHighlight>
        </Left>
        <Body style={{ maxWidth : (SCREEN_WIDTH*50)/100}} >
        {/* <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen')}> */}
          <View>
          <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>{trackTitle}</Text>
          <Text note numberOfLines={1} style={{fontWeight:'bold'}}>{trackArtist}</Text>
          </View>
        {/* </TouchableHighlight> */}
        </Body>
        {Platform.OS === 'ios' && 
        <Right>       
        { playbackState == "paused"  && <Button transparent onPress={togglePlayback}>
        <Icon name='play' type="AntDesign" style={{ color :theme.DEFAULT_COLOR ,fontSize:30}}  />  
          </Button>}

        { playbackState == "playing" && <Button transparent onPress={togglePlayback}>
        <Icon name='pause' type="AntDesign" style={{ color :theme.DEFAULT_COLOR ,fontSize:30 }}  /> 
          </Button>}
        </Right>
        }
        {Platform.OS === 'android' && 
        <Right>       
        { playbackState == 2  && <Button transparent onPress={togglePlayback}>              
          <Icon name='play' type="AntDesign" style={{ color :theme.DEFAULT_COLOR ,fontSize:30}}  />  
        </Button>}

        { (playbackState == 3) && <Button transparent onPress={togglePlayback}>
          <Icon name='pause' type="AntDesign" style={{ color :theme.DEFAULT_COLOR ,fontSize:30 }}  /> 
        </Button>}
        </Right>
        }
        
      </ListItem>}
     </View>           
   
    );
  }