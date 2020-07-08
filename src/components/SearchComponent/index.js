import React, { Component } from 'react';
import { View ,Image,Dimensions,TouchableHighlight,Alert} from 'react-native';
import { Container, Header, Content, Card,Title, CardItem, Thumbnail, Text, Button, Icon, Left, Body,List, ListItem, Right } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class CardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const {footer,height,width,radius,post_id,post_artist, post_title, post_image,post_name, post_file, music} = this.props
    // console.log("TL get music :", JSON.stringify(post_name));
    // post_name!=false && console.log("ok");
    // console.log("TL get music obj :", Object.keys(post_name))
    // (post_name!=false) ? console.log("TL get music :") : console.log("TL get music else:")
    console.log("new release test chack", post_file)
    return (
      <View style={{marginHorizontal:5, backgroundColor:"#0A151F"}}>
        <TouchableHighlight activeOpacity={0.6}  onPress={() => Actions.jump('playlistscreen',{ data : music, currentmusic:{"id":post_id,
 "url":post_file,
 "artwork":post_image,
 "artist":post_artist,
 "title":post_title
} })}>
        <Card style={{ elevation: 3,backgroundColor:"#0A151F", borderColor :"#0A151F"}}>          
          <CardItem cardBody style={{ backgroundColor:"#0A151F", }} >
            {/* <Image style={{ height: 300, flex: 1 }} source={item.image} /> */}
            <Left>
            <Image source={{uri: post_image}} style={{borderRadius:radius,height:height, width:width}}/>    
            </Left> 
          
                       
            <Body style={{marginVertical:10}}>
              <Text style={{ color:"#fff", fontSize : 15, fontWeight:"bold"}}>{post_title}</Text>
              {/* { (post_name.name!=undefined) && <Text note style={{ fontSize : 10}}> {post_name.name} </Text> } */}
            </Body>            
          
         
          </CardItem>     
        </Card>
        </TouchableHighlight>
      </View>
    );
  }
}
