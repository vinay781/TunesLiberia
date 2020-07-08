import React, { Component } from 'react';
import { Image,StyleSheet,TouchableOpacity,SafeAreaView, Modal,TouchableHighlight, View, Dimensions,Alert,BackHandler, ViewPropTypes, FlatList } from "react-native";
import {Actions} from 'react-native-router-flux';
import { Container,Header,Content,Footer,Left,Right,Body,Title,FooterTab,Button,Icon,Text,Card,CardItem,Thumbnail,ListItem,List,Spinner } from 'native-base';
import CardComponentTop from '../components/CardComponentTop';
import CardComponent from '../components/CardComponent';
import AlbumComponent from '../components/AlbumComponent';
import VideoPlayerComponent from '../components/VideoPlayerComponent';
import MiniPlayer from '../components/MiniPlayer';
import theme from  '../config/theme';
import {styles} from '../config/style';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      loading : false,
      featured : null,
      newrelease : null,
      albumlist : null,
      artistlist : null,
      videolist : null,
      freemusic : null,
      genrelist : null,
      miniplayershow:null,
        modalVisible: false
    
    };
   
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  getFeaturedSongs = () => {
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getfeaturedPlaylistByadmin")
    .then(response => response.json())
    .then(data => {       
      // console.log("TL getFeaturedPlaylist : ", JSON.stringify(data));
      this.setState({loading : false, featured : data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})        
      console.log("TL getFeaturedPlaylist ERROR : ", error);          
    });
  }
  
  getNewRelease = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/music")
    .then(response => response.json())
    .then(data => { 
      this.setState({loading : false, newrelease:data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})        
      console.log("TL getmusic ERROR : ", error);          
    });
  } 
  
  getAlbumList = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/GetAlbumsList")
    .then(response => response.json())
    .then(data => { 
      // console.log("TL getAlbumList : ",JSON.stringify(data));
      this.setState({loading : false, albumlist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})        
      console.log("TL getAlbumList ERROR : ", error);          
    });
  }

  getArtistList = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/GetArtistList")
    .then(response => response.json())
    .then(data => { 
      // console.log("TL getArtistList : ",JSON.stringify(data));
      this.setState({loading : false, artistlist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})        
      console.log("TL getArtistList ERROR : ", error);          
    });
  }

  getVideosList = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/videos")
    .then(response => response.json())
    .then(data => { 
      // console.log("TL getVideosList : ",JSON.stringify(data));
      this.setState({loading : false, videolist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})        
      console.log("TL getVideosList ERROR : ", error);          
    });
  }

  getFreeMusic = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getFreemusic")
    .then(response => response.json())
    .then(data => { 
      this.setState({loading : false, freemusic:data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})        
      console.log("TL getmusic ERROR : ", error);          
    });
  }

  getGenersList = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/GetGenersList")
    .then(response => response.json())
    .then(data => { 
      // console.log("TL getArtistList : ",JSON.stringify(data));
      this.setState({loading : false, genrelist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})        
      console.log("TL getArtistList ERROR : ", error);          
    });
  }

  cheack = async () =>{
    const currentTrack = await TrackPlayer.getCurrentTrack(); 
   const cheacktrack =await TrackPlayer.getBufferedPosition()
    console.log("cheacktracktest" , currentTrack) 
    if(currentTrack==undefined){
      this.setState({
        miniplayershow:false
      })
    }
    else{
      this.setState({
        miniplayershow:true
      })
    }
    
}
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);    
  
}
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.getFeaturedSongs();
    this.getNewRelease();
    this.getAlbumList();
    this.getArtistList();
    this.getVideosList();
    this.getGenersList();
    this.getFreeMusic();
    
  }
  // shouldComponentUpdate(){
  //   this.cheack();
  // }
  handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', 
      [{
        text: 'Cancel',
        onPress: () => { console.log('cancel to exit') },
        style: 'cancel'
        }, {
            text: 'OK',
            onPress: () => {BackHandler.exitApp()}
        }, ], 
        {
          cancelable: false
        }
    )  
    return true;
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#fff" />
  }
  render() {
    const { loading, featured,modalVisible, newrelease,miniplayershow, albumlist, artistlist, genrelist, videolist, freemusic } = this.state
    const {hellodaata} = this.props
     console.log("hellodatatest",hellodaata)
     
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Body>
            <Title style={{color:"#fff",paddingRight: (SCREEN_WIDTH * 20)/100  }}> Home </Title>
          </Body>
          <Right>
            <Button             
            transparent 
            onPress={()=> { Actions.jump("notification") }}
            >
              <Icon name='bell' type="EvilIcons" style={{ color :"#fff" }}  />
              {/* { pending > 0 && <View style={{ backgroundColor : theme.PINK_COLOR, borderRadius: 5, width: 7, height:7, top : 13, left :24, position : "absolute" }}></View> } */}
            </Button>
            <Button             
            transparent 
            onPress={()=> { Actions.jump("search") }}
            >
              <Icon name='search' type="EvilIcons" style={{ color :"#fff" }}  />              
            </Button>
            
          </Right>
        </Header>
        <Content style={{backgroundColor:'#0A151F',paddingHorizontal: 15}} >     
        <List> 
          <View>
          {featured==null ? this.renderLoader() :                                    
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={featured}
              renderItem={({ item }) => <CardComponentTop 
              color={true} 
              height={(SCREEN_WIDTH * 50) / 100} 
              width={(SCREEN_WIDTH * 83) / 100} 
              radius={20}
              post_image = {item.artwork}                                     
            /> }
              keyExtractor={(item, index) => {
                return item.id.toString()
              }}                    
            />                      
          }
          </View>
          {/************ NEW RELEASE *********************/}
          <ListItem noBorder style={styles.homeSliderHeader}>
            <Left style={styles.sliderHeaderLeft}>
              <Text style={{color:"#fff",fontWeight:"bold",fontSize:12}}> NEW RELEASE</Text>
            </Left>
            <Right>              
              <Button transparent small onPress={()=> { Actions.jump("seeall",{ title : "NEW RELEASE", type : "newrelease" }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>       
              </Button>
            </Right>
          </ListItem>
          <View>
            { newrelease==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={newrelease}
              renderItem={({ item }) => <CardComponent            
                color={true} 
                height= {(SCREEN_WIDTH * 21) / 100} 
                width={(SCREEN_WIDTH * 21) / 100} 
                radius={10}
                music={newrelease}
                post_title = {item.title}                                     
                // post_name = {item.albums!=false && item.albums[0]}                                     
                post_file = {item.url}
                post_image = {item.artwork}  
                post_id = {item.id}      
                post_artist = {item.artist}                                   
              /> }
              keyExtractor={(item, index) => {
                return item.id.toString();
              }}                    
            />
            }
          </View>
          {/************ ALBUMS *********************/}
          <ListItem noBorder style={styles.homeSliderHeader}>
            <Left style={styles.sliderHeaderLeft}>
              <Text style={{color:"#fff",fontWeight:"bold",fontSize:12}}> ALBUMS </Text>
            </Left>
            <Right >              
              <Button transparent small onPress={()=> { Actions.jump("seeall",{ title : "ALBUMS", type : "albums" }) }}>
                <Text style={styles.homeSeeAllButton} > See all </Text>           
              </Button>
            </Right>
          </ListItem>
          <View>
            { albumlist==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={albumlist}
              renderItem={({ item }) => <AlbumComponent
                color={true} 
                height= {(SCREEN_WIDTH * 21) / 100} 
                width={(SCREEN_WIDTH * 21) / 100} 
                radius={10}
                post_title = {item.category}                                     
                post_name = {item.description}                                     
                post_taxanomy ={item.taxonomy}                                  
                post_image = {item.image}                                     
              /> }
              keyExtractor={(item, index) => { return item.id.toString() }}                    
            />
            }
          </View>
          {/************ ARTISTS *********************/}
          <ListItem noBorder style={styles.homeSliderHeader}>
            <Left style={styles.sliderHeaderLeft}>
              <Text style={{color:"#fff",fontWeight:"bold",fontSize:12}}> ARTISTS </Text>
            </Left>
            <Right>              
              <Button transparent small onPress={()=> { Actions.jump("seeall",{ title : "ARTISTS", type : "artists" }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>          
              </Button>
            </Right>
          </ListItem>
          <View>
            { artistlist==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={artistlist}
              renderItem={({ item }) => <AlbumComponent            
                color={true} 
                height= {(SCREEN_WIDTH * 21) / 100} 
                width={(SCREEN_WIDTH * 21) / 100} 
                radius={10}
                post_title = {item.category}                                     
                post_name = {item.description}                                     
                post_taxanomy ={item.taxonomy}                                   
                post_image = {item.image}                                     
              /> }
              keyExtractor={(item, index) => { return item.id.toString()}}                    
            />
            }
          </View>
          {/************ VIDEOS *********************/}
          <ListItem noBorder style={styles.homeSliderHeader}>
            <Left style={styles.sliderHeaderLeft}>
              <Text style={{color:"#fff",fontWeight:"bold",fontSize:12}}> VIDEOS </Text>
            </Left>
            <Right>              
              <Button transparent small 
                onPress={()=> { Actions.jump("seeall",{ title : "VIDEOS", type : "videos" }) }}
              >
              <Text style={styles.homeSeeAllButton} > See all </Text>           
              </Button>
            </Right>
          </ListItem>
          <View>
            { videolist==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={videolist}
              renderItem={({ item }) => <VideoPlayerComponent            
              color={true} 
              height= {(SCREEN_WIDTH * 21) / 100} 
              width={(SCREEN_WIDTH * 21) / 100} 
              radius={10}
              music={videolist}
              post_title = {item.title}                                     
              post_name = {item.albums!=false && item.albums[0].name}                                     
              post_file = {item.file_url}                                     
              post_image = {item.image}                                     
            />}
              keyExtractor={(item, index) => { return item.id.toString() }}                    
            />
            }
          </View>
          {/************ FREE MUSIC *********************/}
          <ListItem noBorder style={styles.homeSliderHeader}>
            <Left style={styles.sliderHeaderLeft}>
              <Text style={{color:"#fff",fontWeight:"bold",fontSize:12}}> FREE MUSIC </Text>
            </Left>
            <Right>              
              <Button transparent small onPress={()=> { Actions.jump("seeall",{ title : "FREE MUSIC", type : "freemusic" }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>       
              </Button>
            </Right>
          </ListItem>
          <View>
            { freemusic==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={freemusic}
              renderItem={({ item }) => <CardComponent            
                color={true} 
                height= {(SCREEN_WIDTH * 21) / 100} 
                width={(SCREEN_WIDTH * 21) / 100} 
                radius={10}
                music={freemusic}
                post_id = {item.id}      
                post_title = {item.title}                                     
                post_image = {item.artwork}  
                post_file = {item.url}
                post_artist = {item.artist}                                   
                // post_album = {item.albums!=false && item.albums[0]}                                     
              /> }
              keyExtractor={(item, index) => {
                return item.id.toString()
              }}                    
            />
            }
          </View>
          {/************ GENERES *********************/}
          <ListItem noBorder style={styles.homeSliderHeader}>
            <Left style={styles.sliderHeaderLeft}>
              <Text style={{color:"#fff",fontWeight:"bold",fontSize:12}}> GENRES </Text>
            </Left>
            <Right>              
              <Button transparent small onPress={()=> { Actions.jump("seeall",{ title : "GENRES", type : "genres" }) }}>
              <Text style={styles.homeSeeAllButton} > See all </Text>            
              </Button>
            </Right>
          </ListItem>
          <View>
            { genrelist==null ? this.renderLoader() :  
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={genrelist}
              renderItem={({ item }) => <AlbumComponent            
                color={true} 
                height= {(SCREEN_WIDTH * 21) / 100} 
                width={(SCREEN_WIDTH * 21) / 100} 
                radius={10}
                post_title = {item.category}                                     
                post_name = {item.description}                                     
                post_taxanomy ={item.taxonomy}                                     
                post_image = {item.image}                                     
              /> }
              keyExtractor={(item, index) => { return item.id.toString() }}                    
            />
            }
          </View>
        </List>
        {/* <PlaylistScreen/>  */}
        </Content> 

        <View> 
        <MiniPlayer style={{backgroundColor:"red"}}/> 
        </View>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{flexDirection:"row-reverse",width:(SCREEN_WIDTH*60)/100,backgroundColor:"red"}}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
              <Icon name="close-o" type="EvilIcons" style={{ backgroundColor:theme.PINK_COLOR }} />   
              </TouchableHighlight>          
              </View>
              <View>
              <Image
                   source={theme.PAYDOWNLOAD}  
                   style={{width:(SCREEN_WIDTH*20)/100,height:(SCREEN_WIDTH*20)/100}}                     
                  //  style={styles.logoSignInModal}       
                />  
              </View>
              <View style={{width:(SCREEN_WIDTH*60)/100,backgroundColor:"red",marginVertical:10,marginHorizontal:20}}>
              <Text style={styles.textStyle}>DOWNLOAD UNLIMITED</Text>
              <Text style={{fontWeight: "bold", textAlign: "center",color:theme.PINK_COLOR,fontSize:(SCREEN_WIDTH*4)/100}}>HD SONGS!</Text>
              <Text note style={{marginVertical:10}} numberOfLines={2}>Lorem Ipsum is simply dummy text of the printing</Text>
              </View>
              

              
                <Text style={styles.textStyle}>Hide Modal</Text>
              
            </View>
          </View>
        </Modal>
        
        <Footer style={styles.footerSize} >
          <FooterTab style={{backgroundColor:theme.PINK_COLOR}}  >
            <Button>
              <Icon name="control-play" type="SimpleLineIcons" style={{ fontSize: (SCREEN_WIDTH * 5)/100, color: '#0A151F' }} />             
            </Button>
            <Button onPress={()=>{this.setModalVisible(true)}} >
              <Icon name="music-tone" type="SimpleLineIcons" style={styles.footerIcon}/>              
            </Button>
            <Button onPress={()=> { Actions.jump("library") }} >
              <Icon name="library-music" type="MaterialCommunityIcons" style={styles.footerIcon}/>              
            </Button>
            <Button onPress={()=> { Actions.jump("buzz") }} >
              <Icon name="vibrate" type="MaterialCommunityIcons" style={styles.footerIcon} />              
            </Button>
            <Button onPress={()=> { Actions.jump("profile") }} >
              <Icon name="user" type="AntDesign" style={styles.footerIcon} />              
            </Button>
          </FooterTab>
        </Footer>    
      </Container>
    );
  }
}

// const DATA = [
//   {  userId: "1", fullname: "Guide", artwork: theme.BAN_A},
//   {  userId: "2", fullname: "Guide", artwork: theme.BAN_B},
//   {  userId: "3", fullname: "Guide", artwork: theme.BAN_C},
//   {  userId: "4", fullname: "Guide", artwork: theme.BAN_D},
//   {  userId: "5", fullname: "Guide", artwork: theme.BAN_E},
//   {  userId: "6", fullname: "Guide", artwork: theme.BAN_A},
// ];


