import React, { Component } from 'react';
import { View ,Image,Dimensions, Alert} from 'react-native';
import { Container, Header, Content, Card,Title, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import theme from '../../config/theme';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class VideoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {post_image, post_title, post_time, post_description} = this.props
    return (
      <View style={{marginVertical:15,marginHorizontal:20}}>
        <View>
          <Image source={{uri: post_image}} style={{height:(SCREEN_HEIGHT*18)/100 , width: null, flex: 1 ,borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}/>          
          <View style={{height: "26%", width:"13%",position: 'absolute', margin: 1,  left: "45%", top: "40%",}}>
            <Icon name='play' type="FontAwesome5" style={{ color :"#fff",fontSize: 20}} onPress={()=> Alert.alert("In progressing")} />
          </View>
        </View>             
        <View style={{marginTop:10,marginHorizontal:10}} >
          <Text style={{color:theme.WHITE_COLOR,fontWeight:"bold", fontSize:14 }}>{post_title}</Text>
          {/* <Text note>hello</Text> */}
        </View>                 
      
      </View>
    );
  }
}
