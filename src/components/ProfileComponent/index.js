import React, { Component } from 'react';
import { View ,Image,Dimensions} from 'react-native';
import { Container, Header, Content, Card,Title,ListItem, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import theme from '../../config/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const {post_image,height,width,radius, post_title, post_time, post_description} = this.props
    return (
      <View>
        <View style={{marginHorizontal:18,marginTop:15}}>
          <View style={{flexDirection:"row", width:(SCREEN_WIDTH*100)/100,}}>
             <Image source={{uri: post_image}} style={{borderRadius:10,height:(SCREEN_WIDTH*22)/100, width:(SCREEN_WIDTH*22)/100,marginHorizontal:5}}/>
             <View  style={{flexDirection:"column" ,paddingHorizontal:5, width:(SCREEN_WIDTH*70)/100, }}>
                <Text  ellipsizeMode='tail' numberOfLines={2} style={{color:"white",fontWeight:"bold" ,color:"#ccc",marginTop:5,fontSize:10}}>{post_title}</Text>
                 <Text numberOfLines={2} ellipsizeMode='tail' style={{color:theme.DARK_GREY_COLOR,fontSize:15,marginTop:5,fontSize:10 }}>{post_description}</Text>
                 <View style={{width:50,height:18,borderWidth:1,alignItems:"center",justifyContent:"center", borderRadius:5,borderColor:theme.DARK_GREY_COLOR,marginTop:5,flexDirection:"row"}}>
                     <Icon name="diamond" type="SimpleLineIcons" style={{fontSize:10, color: '#326799'}}/>
                     <Text style={{color:theme.DARK_GREY_COLOR,  fontSize:10}}> Top</Text>
                </View>
             </View>
          </View>
        
              
              {/* <Image source={theme.VIDEO_IMG} style={{height: "26%", width:"13%",position: 'absolute', margin: 1,  left: "45%", top: "40%",}}/> */}
          {/* <View style={{flexDirection:"row",alignItems:"center", marginTop:16, width:(SCREEN_WIDTH*90)/100}}>
              
              <View style={{width:"30%",alignItems:"center",justifyContent:"center", flexDirection:"row" }}>
              <Icon type="EvilIcons" name="like" style={{ color: 'white', }}/>
              <Text style={{fontWeight:"200",color:"#ccc",fontWeight:"bold", fontSize:10}}>18</Text>
              </View>
            
            <View style={{width:"30%",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
            <Icon type="EvilIcons" name="comment" style={{ color: 'white'}}/>
              <Text style={{fontWeight:"200",color:"#ccc",fontWeight:"bold", fontSize:10}}>22</Text>
              </View>
            
            
            <View style={{width:"30%",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
            <Icon type="EvilIcons" name="share-google" style={{ color: 'white'}}/>
              <Text style={{fontWeight:"200",color:"#ccc",fontWeight:"bold", fontSize:10}}>5</Text>
              </View>
          </View>         */}
      </View>
        <ListItem style={{ marginHorizontal : 15}}></ListItem>
      </View>
    );
  }
}
