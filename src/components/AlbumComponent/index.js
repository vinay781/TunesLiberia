import React, { Component } from 'react';
import { View ,Image,Dimensions,TouchableHighlight,Alert} from 'react-native';
import { Container, Header, Content, Card,Title, CardItem, Thumbnail, Text, Button, Icon, Left, Body,List, ListItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from './style';

export default class AlbumComponent extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const {footer,height,width,radius,post_title,post_image,post_name,post_file, post_taxanomy} = this.props
    return (
      <View style={styles.albumContainer}>
        <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('fullview',{ title : post_title, name : post_name, image : post_image, taxanomy : post_taxanomy})}>
        <Card style={styles.albumCard}>          
          <CardItem cardBody style={styles.albumCardItem} >            
            <Image source={{uri: post_image}} style={{borderRadius:radius,height:height,width:width}}/>     
          </CardItem>
          <List style={[styles.bottomText,{width: width}]}>               
            <Body>
              <Text style={styles.postTitle}>{post_title}</Text>
              {/* <Text note style={styles.postName}>{post_name}</Text> */}
            </Body>            
          </List>        
        </Card>
        </TouchableHighlight>
      </View>
    );
  }
}
