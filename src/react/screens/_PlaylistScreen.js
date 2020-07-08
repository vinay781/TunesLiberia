import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Container,Header,Content,Footer,Left,Right,Body,Title,FooterTab,Button,Icon,Text,Card,CardItem,Thumbnail,ListItem,List } from 'native-base';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import PropTypes from "prop-types";
import {Actions} from 'react-native-router-flux';
import Player from "../components/Player";
// import playlistData from "../data/playlist.json";
// import localTrack from "../resources/pure.m4a";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function PlaylistScreen(props) {
  const playbackState = usePlaybackState();
  const {data} = props
   console.log("DATA : ", data); 
  useEffect(() => {
    setup();
  }, []);

  async function setup() {
    console.log("data test:", data);
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.add(data);
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      ]
    });
  }

  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log("data test12:", data);
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add(data);
      // await TrackPlayer.add({
      //   "id": 21,
      //   "url": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/Piano_brokencrash-Brandondorf-1164520478.mp3",
      //   "title": "Test Music 4",
      //   "artist": "test-music-4",
      //   "artwork": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/iTunes-Logo-Header-1280x720-1.jpg",
      //   "duration": 15
      // });
      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }  
  return (    
    <Container style={{ backgroundColor: "#0A151F"}}>
    <Header transparent>
      <Left>
        <Button transparent onPress={()=>Actions.pop()}>
          <Icon name='close' type="MaterialCommunityIcons" style={{ color :"#fff" }}  />
        </Button>
      </Left>
        <Body>            
        </Body>
        <Right>           
        </Right>
      </Header>
    <View style={styles.container}>   
      <Player
        onNext={skipToNext}
        style={styles.player}
        onPrevious={skipToPrevious}
        onTogglePlayback={togglePlayback}
        />
      {/* <Text style={styles.state}>{getStateName(playbackState)}</Text> */}
    </View>
    </Container>
  );
}

// PlaylistScreen.navigationOptions = {
//   title: "",
  
// };

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return "None";
    case TrackPlayer.STATE_PLAYING:
      return "Playing";
    case TrackPlayer.STATE_PAUSED:
      return "Paused";
    case TrackPlayer.STATE_STOPPED:
      return "Stopped";
    case TrackPlayer.STATE_BUFFERING:
      return "Buffering";
  }
}

async function skipToNext() {
  try {
    await TrackPlayer.skipToNext();
  } catch (_) {}
}

async function skipToPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
  } catch (_) {}
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: 400,
    alignItems: "center",
    // backgroundColor: "#0A151F",
    // paddingBottom : 30
  },
  description: {
    width: "80%",
    marginTop: 20,
    textAlign: "center"
  },
  player: {
    marginTop: 40
  },
  state: {
    marginTop: 20
  }
});


const PLAYLIST = [
  {
    "id": 21,
    "url": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/Piano_brokencrash-Brandondorf-1164520478.mp3",
    "title": "Test Music 4",
    "artist": "test-music-4",
    "artwork": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/iTunes-Logo-Header-1280x720-1.jpg",
    "duration": 15
  },
  {
    "id": 18,
    "url": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/Silly_Farts-Joe-1473367952.mp3",
    "title": "Test Music 3",
    "artist": "test-music-3",
    "artwork": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/iTunes-Logo-Header-1280x720-1.jpg",
    "duration": 15
  },
  {
    "id": 15,
    "url": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/sweeping_straw_broom-mike-koenig.mp3",
    "title": "Test Music 1",
    "artist": "test-music-1",
    "artwork": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/iTunes-Logo-Header-1280x720-1.jpg",
    "duration": 15
  },
  {
    "id": 8,
    "url": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/04/file_example_MP3_1MG.mp3",
    "title": "Test Music",
    "artist": "test-music",
    "artwork": "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/iTunes-Logo-Header-1280x720-1.jpg",
    "duration": 15
  }
];