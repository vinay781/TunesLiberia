import React, { Component ,Fragment} from 'react';
import { View ,ImageBackground,TouchableOpacity,Image,AsyncStorage,BackHandler, FlatList,Alert} from 'react-native';
import { Container, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, FooterTab, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
import SeeAllComponent from '../components/SeeAllComponent';
export default class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
     featuredlist : null
    };
    
  }
 
  getFeaturedPlaylist = () => {
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getfeaturedPlaylistByadmin")
    .then(response => response.json())
    .then(data => {       
      console.log("TL getFeaturedPlaylist : ", JSON.stringify(data));
      this.setState({loading : false, featuredlist : data.musicslist})          
    })
    .catch((error) => { 
      this.setState({ loading : false})        
      console.log("TL getFeaturedPlaylist ERROR : ", error);          
    });
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.getFeaturedPlaylist();
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
      Actions.pop();
      return true;
  }  

  render() {
    const { featuredlist } = this.state
    return (
    <Container style={styles.containerMainDiscover} >
    <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}> Playlist</Title>
          </Body>
          <Right> 
            {/* <Button             
             transparent 
            >
              <Icon name='search' type="EvilIcons" style={{ color :"#fff" }}  />              
            </Button>          */}
          </Right>
        </Header>
        <Content style={{backgroundColor:theme.DEFAULT_COLOR}} >
        <View style={styles.containerInnerImageAlbums} >
            <View  style={styles.imageOuterViewAlbums}>
              <Image                          
                source={require("../assets/images/playlists.png")}                       
                style={styles.AlubmsImage}   
              />                  
              </View>
                <View style={styles.textTitleAlbums} >
                <Text style={styles.titleAlbums}> Featured Playlist </Text> 
              {/* <Text style={styles.titleAlbumsviews}>56k+ Favorites | 18M+ Playouts</Text> */}
              </View>
         </View>
         {featuredlist!=null &&
        <View>
           <FlatList 
              showsVerticalScrollIndicator={false}                  
              data={featuredlist}
              renderItem={({ item }) => <SeeAllComponent
                music={featuredlist}
                post_id = {item.id}  
                post_title={item.title}               
                artist={item.artist}
                post_image={item.artwork}
                post_file = {item.url}
              /> }
              keyExtractor={(item, index) => {
                return item.id;
              }}                    
            />
        </View> 
       } 
                   
        </Content>              
        </Container>

    );
  }
}
