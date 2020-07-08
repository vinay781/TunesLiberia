import React, { Component } from 'react';
import { View ,Image,Dimensions,TouchableHighlight,Alert} from 'react-native';
import { Container, Header, Content, Card,Title, CardItem, Thumbnail, Text, Button, Icon, Left, Body,List, ListItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class VideoPlayerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const {footer,height,width,radius, post_title, post_image,post_name, post_file, music} = this.props
    
    return (
      <View style={{marginHorizontal:5, backgroundColor:"#0A151F"}}>
        <TouchableHighlight activeOpacity={0.6} 
        onPress={() => Actions.jump('videoplayer',{title : post_title})}
        >
        <Card style={{ elevation: 3,backgroundColor:"#0A151F", borderColor :"#0A151F"}}>          
          <CardItem cardBody style={{ backgroundColor:"#0A151F", }} >
            {/* <Image style={{ height: 300, flex: 1 }} source={item.image} /> */}
            <Image source={{uri: post_image}} style={{borderRadius:radius,height:height, width:width}}/>     
          </CardItem>
          <List style={{ width:width, backgroundColor:"#0A151F", paddingVertical:5 }}>               
            <Body>
              <Text style={{ color:"#fff", fontSize : 10, fontWeight:"bold"}}>{post_title}</Text>
              {/* { (post_name.name!=undefined) && <Text note style={{ fontSize : 10}}> {post_name.name} </Text> } */}
            </Body>            
          </List>        
        </Card>
        </TouchableHighlight>
      </View>
    );
  }
}
