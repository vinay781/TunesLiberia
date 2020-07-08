import React, { Component } from "react";
import { View, ImageBackground,Image, FlatList,Dimensions, Alert, BackHandler,TouchableHighlight, AsyncStorage} from 'react-native';
import { Container, Header,Footer,FooterTab, Content, Accordion,Left,Button,Body,Icon,Separator,Title, Right, Spinner,ListItem, Text, Switch } from "native-base";
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false        
    };
  }


  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
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

  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#724894" />
  }
  render() {
    const { loading, notifications } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}> Library</Title>
          </Body>
          <Right> 
            {/* <Button             
             transparent 
            // onPress={()=> { Actions.jump("notifications") }}
            >
              <Icon name='search' type="EvilIcons" style={{ color :"#fff" }}  />              
            </Button>          */}
          </Right>
        </Header>
        <Content  >
         {/* <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:(SCREEN_WIDTH*4)/100,paddingVertical:10}}>
           <View style={{alignItems:"center"}}>
           <Image source={theme.LOCALMUSIC} style={{height:(SCREEN_WIDTH*20)/100, width:(SCREEN_WIDTH*20)/100}}/>
           <Text style={{color:"white", fontSize:(SCREEN_WIDTH*3)/100}}>LOCALMUSIC</Text>
           </View>
           <View style={{alignItems:"center"}}>
           <Image source={theme.PRIVATEFM} style={{height:(SCREEN_WIDTH*20)/100, width:(SCREEN_WIDTH*20)/100}}/>
           <Text style={{color:"white", fontSize:(SCREEN_WIDTH*3)/100}}>PRIVATEFM</Text>
           </View>

           <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('videos')}>
           <View style={{alignItems:"center"}}>
           <Image source={theme.VIDEO} style={{height:(SCREEN_WIDTH*20)/100, width:(SCREEN_WIDTH*20)/100}}/>
           <Text style={{color:"white", fontSize:(SCREEN_WIDTH*3)/100}}>VIDEOS</Text>
           </View>
          </TouchableHighlight>
         </View> */}

         <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:(SCREEN_WIDTH*5)/100,paddingVertical:10}}>          
          
          <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('favourites')}>
           <View style={{alignItems:"center"}}>
           <Image source={theme.FAVOURITE} style={{height:(SCREEN_WIDTH*20)/100, width:(SCREEN_WIDTH*20)/100}}/>
           <Text style={{color:"white", fontSize:(SCREEN_WIDTH*3)/100}}>FAVORITE</Text>
           </View>
          </TouchableHighlight>

          <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('myplaylists')}>
           <View style={{alignItems:"center"}}>
           <Image source={theme.PLAYLISTS} style={{height:(SCREEN_WIDTH*20)/100, width:(SCREEN_WIDTH*20)/100}}/>
           <Text style={{color:"white", fontSize:(SCREEN_WIDTH*3)/100}}>MY PLAYLISTS</Text>
           </View>
          </TouchableHighlight>

          <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('downloads')}>
           <View style={{alignItems:"center"}}>
            <Image source={theme.DOWNLOAD} style={{height:(SCREEN_WIDTH*20)/100, width:(SCREEN_WIDTH*20)/100}}/>
            <Text style={{color:"white", fontSize:(SCREEN_WIDTH*3)/100}}>DOWNLOADS</Text>
           </View>
          </TouchableHighlight>
         </View>
         <View style={{alignItems:"center",marginVertical:10}}>
         <View style={{height:10,width:(SCREEN_WIDTH*90)/100,borderBottomWidth:1,borderBottomColor:"#ccc"}}></View>
         </View>
         
       
        </Content>
       
      </Container>
    );
  }
}