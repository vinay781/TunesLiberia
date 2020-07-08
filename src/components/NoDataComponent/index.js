import React, { Component } from 'react';
import { View ,Image,Alert,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card,Title, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import theme from '../../config/theme';
import { Actions } from 'react-native-router-flux';
export default class NoDataComponent extends Component {
  constructor(props) {
    super(props);
   
  }

  render() {
    const { post_title, post_description} = this.props    
    return (
      <View style={{marginVertical:10}} >
        <Card  style={{ borderRadius: 20 ,paddingHorizontal:0}} >
          
          <CardItem cardBody style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20}}  >
            {/* <Image source={{uri: post_image}} style={{height: 100, width: null, flex: 1 ,borderTopLeftRadius: 20, borderTopRightRadius: 20}} />            */}
          </CardItem>          
          <CardItem>
            <Body>
              <Text style={{marginBottom: 10,color:theme.PURPLE_COLOR,fontWeight:"bold" }}>{post_title}</Text>
              <Text note ></Text>
            </Body>           
          </CardItem>
          <CardItem style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20,paddingHorizontal:0}} >
            <Text note>{}</Text>
          </CardItem>
        </Card>
      </View>
    );
  }
}
