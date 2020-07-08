import React, { useState } from "react";
import { Image,StyleSheet,Text,TouchableOpacity,Modal,View,ViewPropTypes,Dimensions,Alert,Slider} from "react-native";
import { Icon } from 'native-base';
import TrackPlayer, { useTrackPlayerProgress, usePlaybackState, useTrackPlayerEvents } from "react-native-track-player";
import PropTypes from "prop-types";
import theme from "../../config/theme";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function ProgressBar() {
  const progress = useTrackPlayerProgress();

  return (
    <View style={styles.progress}>
       <Slider style={{width:"100%"}} minimumTrackTintColor={theme.PINK_COLOR} thumbTintColor={theme.PINK_COLOR} maximumTrackTintColor="#112330" maximumValue={progress.duration} value={progress.position} onValueChange={(value)=>{TrackPlayer.seekTo(value)}}/>
    </View>
  );
}

function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default function Player(props) {
  const { thisTrack } = props;
  const progress = useTrackPlayerProgress();

  const playbackState = usePlaybackState();
  const [trackId, setTrackId] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState("");

  useTrackPlayerEvents(["playback-track-changed"], async event => {
    
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const { id, title, artist, artwork } = track || {};
      setTrackId(id);
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  const { style, onNext, onPrevious, onTogglePlayback, onFavoriteSong,onretweet, addToPlaylist, downloadSong } = props;
 
  var prevButtonText =  <Icon name='step-backward' type="FontAwesome" style={{ color :theme.PINK_COLOR,fontSize:50 }}  />;
  var nextButtonText =  <Icon name='step-forward' type="FontAwesome" style={{ color :theme.PINK_COLOR ,fontSize:50 }}  />;
  var middleButtonText =  <Icon name='play' type="AntDesign" style={{ color :theme.PINK_COLOR ,fontSize:50}}  />;

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonText = <Icon name='pause' type="FontAwesome" style={{ color :theme.PINK_COLOR ,fontSize:50 }}  />;
  }

  return (
    <View style={[styles.card, style]}>
      <Image style={styles.cover} source={{ uri: trackArtwork }} />
     
      <Text style={styles.title}>{trackTitle}</Text>
      <Text style={styles.artist}>{trackArtist}</Text>
       
       <View style={{flexDirection:"row",justifyContent:"space-between",width:"75%",marginVertical:20}}>                  
          <Icon name='favorite-border' type="MaterialIcons" style={{ color :"#fff",fontSize: 20}} onPress={onFavoriteSong} />
          <Icon name='arrow-collapse-down' type="MaterialCommunityIcons" style={{ color :"#fff",fontSize: 20}} onPress={downloadSong} />
          <Icon name='playlist-add' type="MaterialIcons"  style={{ color :"#fff",fontSize: 20}} onPress={addToPlaylist} />
          <Icon name='retweet' type="AntDesign" style={{ color :"#fff",fontSize: 20}} onPress={onretweet}  />
      </View> 
    
      <ProgressBar />
      <View style={styles.controls}>
        <ControlButton title={prevButtonText} onPress={onPrevious} />
        <ControlButton title={middleButtonText} onPress={onTogglePlayback} />
        <ControlButton title={nextButtonText} onPress={onNext} />
      </View>     
    </View>
    
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired
};

Player.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  card: {
    width: "100%",    
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: "center",
    shadowColor: "black",
    backgroundColor: theme.DEFAULT_COLOR,
    shadowOffset: { width: 0, height: 1 }
  },
  cover: {
    height :(SCREEN_WIDTH * 55) / 100 ,
    width:(SCREEN_WIDTH * 55) / 100,
    marginTop: 20,
    backgroundColor: "grey",
    borderRadius:20
  },
  progress: {
    width: "80%",
    // marginVertical: 25,
    flexDirection: "row",
    borderRadius:50
  },
  title: {
    marginTop: 25,
    color:"white",
    fontWeight:"bold",
    fontSize:25
  },
  artist: {
    marginTop: 5,
    color:"white",
    fontWeight:"bold",
    fontSize:20
  },
  controls: {
    marginVertical: 20,
    flexDirection: "row"
  },
  controlButtonContainer: {
    flex: 1
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: "center"
  }
});
