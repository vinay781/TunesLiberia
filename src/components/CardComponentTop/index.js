import React, { Component } from 'react';
import { View ,Image,Dimensions} from 'react-native';
import { Container, Header, Content, Card,Title, CardItem, Thumbnail, Text, Button, Icon, Left, Body,List, ListItem } from 'native-base';
import theme from '../../config/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class CardComponentTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const {height,width,radius, post_title, post_image,post_name, post_file} = this.props
    return (
      <View style={{marginHorizontal:5, backgroundColor:"#0A151F"}}>
        {/* <Card  style={{ borderRadius: radius ,paddingHorizontal:0, height:height, width:width }}>
          <CardItem cardBody style={{ borderRadius:radius}}>
            <Image source={{uri: post_image}} style={{borderRadius:radius,height:height, width:width}}/>           
          </CardItem>
        </Card> */}
        <Card style={{ elevation: 3, backgroundColor:"#0A151F",borderColor :"#0A151F"}}>          
          <CardItem cardBody style={{  backgroundColor:"#0A151F", }} >
            {/* <Image style={{ height: 300, flex: 1 }} source={item.image} /> */}
            <Image source={{uri: post_image}} style={{ borderRadius:radius, height:height, width:width}} resizeMode="contain" />     
            {/* <Image source={post_image} style={{ borderRadius:radius, height:height, width:width}} resizeMode="contain" />      */}
          </CardItem>                  
        </Card>
      </View>
    );
  }
}
