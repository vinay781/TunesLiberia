import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View, Icon } from 'native-base';
export default class Notification extends Component {
  render() {
      const {discription, time,title, image} = this.props
    return (
     
          <List>
            <ListItem avatar >
              <Left>
                  <View style={{
                    width:35,height:35,                    
                    backgroundColor : "#5a2a74",
                    borderRadius: 100,
                    justifyContent : "center",
                    alignItems : "center"
                    }}>
                     <Thumbnail large style={{width:35,height:35}} source={{ uri: image }} />
                     {/* <Icon name='bell' type="EvilIcons" style={{ color :"#fff"}}  /> */}
                </View>
              </Left>
              <Body>
                    <Text style={{color:"white",}} >{title}</Text>
                    <Text  note>{discription}</Text>
                    {/* <View style={{flexDirection:"row",marginTop: 5,}}>
                    <Icon name="md-time" type="Ionicons" style={{fontSize: 15,color:"#ccc",marginRight: 5,}}/>
                    <Text note>{time}</Text>
                    </View> */}
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
      
    );
  }
}