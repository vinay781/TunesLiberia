import React, { useEffect,useState } from "react";
import { StyleSheet, View, Dimensions, AsyncStorage, } from "react-native";
import { Container,Header,Content,Left,Right,Body,Title,FooterTab,Button,Icon,Text,Toast} from 'native-base';
import TrackPlayer, { usePlaybackState } from "react-native-track-player";
import PropTypes from "prop-types";
import {Actions} from 'react-native-router-flux';
import Player from "../components/Player";
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

state = {
  showToast: false
};

addToFavourites = async(songid) => {
  AsyncStorage.getItem('usertoken').then(res => {    
    // console.log("TL addToFavourites token : ", res + " song : " + songid)  
    var formData = new FormData();    

    formData.append("token", res );       
    formData.append("postid", songid );   

    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/addTofavourites", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => {  
      if(data.status=="ok")
      {
        console.log("TL addToFavourites ok")        
        Toast.show({
          text: data.msg,
          duration: 1000
        }) 
      }
      else
      {
        Toast.show({
          text: "Not added.",
          buttonText: "Okay",
          buttonTextStyle: { color: "#fff" },
          buttonStyle: { backgroundColor: "#0A151F" }
        })
      } 
    })
    .catch((error) => {         
      console.log("TL addToFavourites ERROR : ", error);  
      Toast.show({
        text: "Connection issue.."        
      })              
    });
  }); 
}

closePlayer = async() => {
  console.log("closePlayer");
  
  // await TrackPlayer.reset();
  console.log("reset");
  Actions.pop({hellodaata:"helloo testing"})
}

export default function PlaylistScreen(props) {
  const playbackState = usePlaybackState();  
  const { data , currentmusic } = props
  console.log("songPlaylist", currentmusic.id);

  useEffect(() => {
    setup(data,currentmusic);
  }, []);

  
  async function setup(data,currentmusic) {
    console.log("setup")
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(currentmusic)
    // await TrackPlayer.updateMetadataForTrack()
    await TrackPlayer.add(data)
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.  CAPABILITY_PLAY,
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
    await TrackPlayer.play();
  }
  
  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();    
    
    // console.log("togglePlayback : ", currentTrack)
    if(currentTrack == null) 
    {
      await TrackPlayer.reset();
      
      await TrackPlayer.add(currentmusic);
      await TrackPlayer.add(data)
      await TrackPlayer.updateOptions({
        stopWithApp: true,
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
     // await TrackPlayer.add(data);    
      await TrackPlayer.play();
    } 
    else  1
    {
      console.log("2")
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
  } 

  shuffleArray = (array) => {
		let currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	};
	 shuffle = async () => {
    const queue = await TrackPlayer.getQueue();
    console.log("queue",queue)
		const shuffledQueue = this.shuffleArray(queue);
		await TrackPlayer.destroy()
    await TrackPlayer.setupPlayer();
    console.log("shuffledqueu :",shuffledQueue )
		await TrackPlayer.add(shuffledQueue);
		await TrackPlayer.play();
	};

  return (    
    <Container style={{ backgroundColor: "#0A151F"}}>
      <Header transparent>
        <Left style={{ maxWidth : 50}}>
          <Button transparent onPress={()=>this.closePlayer() }>
            <Icon name='close' type="MaterialCommunityIcons" style={{ color :"#fff" }}  />
          </Button>
        </Left>        
        <Body></Body>
        <Right></Right>
      </Header>
      <View style={styles.container}>   
        <Player
          thisTrack={currentmusic}
          onNext={skipToNext}
          style={styles.player}
          onPrevious={skipToPrevious}
          onTogglePlayback={togglePlayback}
          onFavoriteSong={favouriteSong}
          addToPlaylist={()=>songPlaylist(currentmusic.id)}
          downloadSong={purchaseSong}
          onretweet={retweet}
          />
        {/* <Text style={styles.state}>{getStateName(playbackState)}</Text> */}
      </View>   
      
    </Container>
  );
}

// PlaylistScreen.navigationOptions = {
//   title: "",  
// };

// function getStateName(state) {
//   switch (state) {
//     case TrackPlayer.STATE_NONE:
//       return "None";
//     case TrackPlayer.STATE_PLAYING:
//       return "Playing";
//     case TrackPlayer.STATE_PAUSED:
//       return "Paused";
//     case TrackPlayer.STATE_STOPPED:
//       return "Stopped";
//     case TrackPlayer.STATE_BUFFERING:
//       return "Buffering";
//   }
// }


async function purchaseSong() {
  let currentTrack = await TrackPlayer.getCurrentTrack();
  console.log("purchaseSong : ",currentTrack);  
}

async function songPlaylist(currentTrack) {  
  console.log("songPlaylist ds: ",currentTrack);
  Actions.jump('selectplaylist',{ trackid : currentTrack})
  
}
async function retweet(){
  shuffle()
}
async function favouriteSong() {
  let currentTrack = await TrackPlayer.getCurrentTrack();
  console.log("currentTrack : ",currentTrack);
  addToFavourites(currentTrack);
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
  },

  modalOuter : { height:(SCREEN_HEIGHT*100)/100, backgroundColor : "transparent", justifyContent : "center", alignItems : "center" },
    modalInner : { 
        marginTop: (SCREEN_HEIGHT*55)/100,         
        width:(SCREEN_WIDTH*100)/100,
        height:(SCREEN_HEIGHT*45)/100, 
        alignItems:"center", 
        backgroundColor:"#fff", 
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.53,
        shadowRadius: 13.97, 
        elevation: 21 
    },   
    modalCloseButton : { width : "100%"},
    modalBody : { 
        backgroundColor:"#ccc", 
        height:"10%", width: "100%", flex: 1,
    alignItems: 'center' }, 
});

