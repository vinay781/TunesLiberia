import React, { Component ,Fragment} from 'react';
import { View ,ImageBackground,TouchableOpacity,Image,AsyncStorage,BackHandler,FlatList, Alert} from 'react-native';
import { Container, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, FooterTab, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
    };    
  }
 
 
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
    Actions.pop();
    return true;
  }
  render() {
    const { title } = this.props;    
    return (
    <Container style={styles.containerMainDiscover} >
    <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Text style={{color:"#fff",fontWeight : "bold"}}>{title}</Text>            
          </Body>
          <Right>                     
          </Right>
        </Header>
        <Content style={{backgroundColor:theme.DEFAULT_COLOR}} >
       
       
                   
        </Content>              
        </Container>

    );
  }
}
