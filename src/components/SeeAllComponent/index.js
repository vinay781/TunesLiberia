import React, { Component } from 'react';
import {Modal,TouchableOpacity,Image,AsyncStorage,BackHandler,Dimensions, TouchableHighlight,Alert} from 'react-native';
import { Container, Header,Icon, Content, Card, CardItem, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, View } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {styles} from './style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SeeAllComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      toolbar : false      
    };    
  }
renderToolbar=(post_image,post_title,artist,post_id)=>{
  // console.log("toolbar :", post_image+post_title+artist+music+post_id);
  return(
    <Modal 
    animationType="slide"
    transparent={true}
    presentationStyle="overFullScreen"            
    visible={this.state.toolbar}
    onRequestClose={() => { Alert.alert('Modal has been closed.') }}>
      <View style={styles.modalOuter}>
        <View style={styles.modalInner}>  
          <View style={styles.modalCloseButton}>
            <Button transparent style={{ width : "15%"}} onPress={()=>  this.setState({ toolbar : false })} >
                <Icon name='close' style={{ color :"#000" }}  />            
            </Button>                
          </View>  
          <CardItem style={{ backgroundColor : "red", height : 150}}>
            <Body style={{flex: 1, alignItems: 'center'}}>
              <Image style={{ width : "50%", height : "100%"}} source={{ uri: post_image }} resizeMode="contain" />
            </Body>
          </CardItem>  
          <CardItem style={{ backgroundColor : "blue"}}>
            <Body style={{flex: 1, alignItems: 'center'}}>
              <Text style={{ textAlign : "center", padding : 5, fontWeight : "bold" }}>{post_title}</Text>
              <Text style={{ textAlign : "center", padding : 2 }}>artist</Text>  
              <View style={{ width : "100%", height : 2, backgroundColor : "yellow", marginTop : 5 }}/>
              <View style={{ flexDirection : "row", alignItems : "center"}}>
                <Icon name='favorite-border' type="MaterialIcons" style={{ color :"#fff",fontSize: 20}} />
                <Text style={{ textAlign : "center", padding : 5, fontWeight : "bold" }} > Favorite </Text>                
              </View> 
              <View style={{ flexDirection : "row"}}>
                <Icon name='favorite-border' type="MaterialIcons" style={{ color :"#fff",fontSize: 20}} />                
                <Text style={{ textAlign : "center", padding : 5, fontWeight : "bold" }} > Add to playlist </Text>
              </View> 
            </Body>
          </CardItem>                   
          {/* <View style={styles.modalBody}> */} 
          {/* </View>  */}                     
        </View>
      </View>
  </Modal>
  )
}

  render() {
    const {post_image,post_title,artist,music,post_id,post_file} = this.props
    const { toolbar } = this.state
  return (  
    <View key={post_id} style={{marginVertical:5,paddingHorizontal:10}}>
      <ListItem thumbnail noBorder >              
        <Left>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title }})}>
            <Thumbnail  square source={{ uri:post_image }} style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}} />
          </TouchableHighlight>
        </Left>
        <Body>
          <TouchableHighlight activeOpacity={0.6} onPress={()=> Actions.jump('playlistscreen',{ data : music , currentmusic:{"id":post_id, "url":post_file, "artwork":post_image, "artist":artist, "title":post_title }})}>
            <View>
              <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>{post_title}</Text>
              <Text note numberOfLines={1} style={{fontWeight:'bold'}}>{artist}</Text>
            </View>
          </TouchableHighlight>          
        </Body>      
        <Right>             
          <View style={{flexDirection:"row-reverse",justifyContent:"space-between",width:(SCREEN_WIDTH*12)/100}}>
            <Icon name='arrow-collapse-down' type="MaterialCommunityIcons"  style={{ color :"#fff",fontSize: 20}}  />
            {/* <Icon name='dots-three-vertical' type="Entypo" style={{ color :"#fff",fontSize: 20}} onPress={()=> this.setState({ toolbar : true}) }  /> */}
          </View> 
        </Right>
      </ListItem>
      {/* {this.renderToolbar(post_image,post_title,artist,music,post_id)} */}
    </View>     
    );
  }
}