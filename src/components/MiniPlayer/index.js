import React, { Component,useState ,useEffect } from 'react';
import { Platform,Slider} from 'react-native';
import { View, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,Icon } from 'native-base';
import TrackPlayer, { usePlaybackState,useTrackPlayerProgress } from 'react-native-track-player'
import {styles} from './style';
import theme from '../../config/theme'


export default function MiniPlayer(props) {
  const playbackState = usePlaybackState(); 
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackPlayble, setTrackPlayble] = useState();
  const [trackShow, setTrackShow] = useState();
  const progress = useTrackPlayerProgress();
  
    useEffect(() => {
      setup();
    }, []); 

    setTimeout(() => {
      setup();
    }, 1)  

    async function setup(data,currentmusic) {
      const currentTrack = await TrackPlayer.getCurrentTrack();      
      const currentstate = await TrackPlayer.getTrack(currentTrack);    
      if(currentstate==null) {
        setTrackShow(false)
      }
      else {
        setTrackShow(true)
      }
      setTrackArtwork(currentstate.artwork)
      setTrackTitle(currentstate.title)
      setTrackArtist(currentstate.artist)
      setTrackPlayble(playbackState)
  }

  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();        
    const currentstate = await TrackPlayer.getTrack(currentTrack);    
    setTrackArtwork(currentstate.artwork)
    setTrackTitle(currentstate.title)
    setTrackArtist(currentstate.artist)
    if(playbackState === TrackPlayer.STATE_PAUSED) {        
      await TrackPlayer.play();
    } else {       
      await TrackPlayer.pause();
    }    
  }

  return ( 
      <View>
        {trackShow && 
       
        <View style={styles.miniPlayerOuter}>
          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
           <Slider minimumTrackImage={100} step={1}  maximumTrackImage={500} maximumValue={10} value={2} onValueChange={(value)=>{TrackPlayer.seekTo(value)}}/>
           </View>
        <ProgressBar/>
        <ListItem thumbnail noBorder style={styles.miniPlayerList} >              
        <Left>
        {/* <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen')}> */}
        <Thumbnail square source={{ uri: trackArtwork }} style={styles.miniPlayerImage} />
          {/* </TouchableHighlight> */}
        </Left>
        <Body style={styles.miniPlayerBody} >
        {/* <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen')}> */}
          <View>
          <Text style={styles.miniPlayerTitle} >{trackTitle}</Text>
          <Text note numberOfLines={1} style={styles.miniPlayerArtist} >{trackArtist}</Text>
          </View>
        {/* </TouchableHighlight> */}
        </Body>
        {Platform.OS === 'ios' && 
        <Right>       
        { playbackState == "paused"  && <Button transparent onPress={togglePlayback}>
        <Icon name='play' type="AntDesign" style={styles.miniPlayerButton}  />  
          </Button>}

        { playbackState == "playing" && <Button transparent onPress={togglePlayback}>
        <Icon name='pause' type="AntDesign" style={styles.miniPlayerButton}  /> 
          </Button>}
        </Right>
        }
        {Platform.OS === 'android' && 
        <Right>       
        { playbackState == 2  && <Button transparent onPress={togglePlayback}>              
          <Icon name='play' type="AntDesign" style={styles.miniPlayerButton}  />  
        </Button>}

        { (playbackState == 3) && <Button transparent onPress={togglePlayback}>
          <Icon name='pause' type="AntDesign" style={styles.miniPlayerButton}  /> 
        </Button>}
        </Right>
        }        
      </ListItem>
      </View>
      }
     </View>  
    );
  }

  function ProgressBar() {
    const progress = useTrackPlayerProgress();
  
    return (
      <View style={{ height: 5,
        width: "100%",
        flexDirection: "row",
        borderRadius:50}}>
        <View style={{ flex: progress.position, backgroundColor: theme.PINK_COLOR }} />
        <View
          style={{
            flex: progress.duration - progress.position,
            backgroundColor:"#112330"
          }}
        />
      </View>
    );
  }