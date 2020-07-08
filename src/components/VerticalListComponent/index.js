import React, { Component } from 'react';
import { View ,Image,Dimensions,TouchableHighlight,Alert} from 'react-native';
import { Container, Header, Content, Card,Title, CardItem, Thumbnail, Text, Button, Icon, Left, Body,List, ListItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from './style';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class VerticalListComponent extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const {footer,height,width,radius,post_title,post_image,post_name,post_id,post_file} = this.props
    return (
      <View key={post_id} style={styles.albumContainer}>
        <TouchableHighlight activeOpacity={0.6} onPress={() => Actions.jump('fullview',{ title : post_title})}>       
          <View style={{marginHorizontal:18,marginTop:15}}>
            <View style={{flexDirection:"row", width:(SCREEN_WIDTH*100)/100,}}>
              <Image source={{uri: post_image}} style={{borderRadius:radius,height:height, width:width}}/>  
              <View  style={{flexDirection:"column" ,paddingHorizontal:5, width:(SCREEN_WIDTH*70)/100, }}>
                  <Text  ellipsizeMode='tail' numberOfLines={2} style={{color:"white",fontWeight:"bold" ,color:"#ccc",marginTop:5,fontSize:10}}>{post_title}</Text>
                  <Text numberOfLines={2} ellipsizeMode='tail' style={{color:theme.DARK_GREY_COLOR,fontSize:15,marginTop:5,fontSize:10 }}>{post_name}</Text>                
              </View>
            </View>              
          </View>        
        </TouchableHighlight>      
      </View>
    );
  }
}
