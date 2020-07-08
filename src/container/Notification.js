
import React, { Component } from "react";
import { View, ImageBackground,Image, FlatList,Dimensions, Alert, BackHandler, AsyncStorage} from 'react-native';
import { Container, Header,Footer,FooterTab, Content, Accordion,Left,Button,Body,Icon,Separator,Title, Right, Spinner,ListItem, Text, Switch } from "native-base";
import NotificationComponent from "../components/NotificationComponent"
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
import NoDataComponent from "../components/NoDataComponent";

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,     
      notifications : null    
    };
  }


  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.setState({ loading : true})     
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

  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#724894" />
  }
  render() {
    const { loading, notifications } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
         <Header transparent>
        <Left>
        <Button transparent onPress={()=>Actions.pop()}>
            <Icon name='arrow-back' style={{ color :"#fff" }}  />
        </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}>Notifications</Title>
          </Body>
          <Right>
            {/* <Button transparent>
              <Icon name='pencil' type="EvilIcons" style={{ color :"#fff" }}  />
            </Button> */}
          </Right>
        </Header>
        <Content padder >
        {/* <View style={{backgroundColor:theme.WHITE_COLOR}}> */}
            {/* { loading && this.renderLoader()}                   */}
          {/* </View> */}
        <Separator  style={{backgroundColor:theme.DEFAULT_COLOR}}>
            <Text style={{color:"white",fontSize:15 ,fontWeight:"bold"}} >NEW</Text>
          </Separator>
        <FlatList
        data={DATA}
        renderItem={({ item }) => <NotificationComponent 
        discription={item.description}
        time = {item.time} 
        title = {item.title}
        image = {item.image}
        />}
        keyExtractor={item => item.id}
      /> 
       {/* <NoDataComponent 
      color={true} 
      post_title="Not Found" 
      post_description=""
  />  */}
      <Separator  style={{backgroundColor:theme.DEFAULT_COLOR,marginVertical:15}}>
            <Text style={{color:"white",fontSize:15, fontWeight:"bold"}} >EARLIER</Text>
          </Separator>
        <FlatList
        data={DATA}
        renderItem={({ item }) => <NotificationComponent 
        discription={item.description}
        time = {item.time} 
        title = {item.title}
        image = {item.image}/>}
        keyExtractor={item => item.id}
      />      

       
        </Content>
        
      </Container>
    );
  }
}


const DATA = [
    {  title: "Alice", description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor", image: "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/iTunes-Logo-Header-1280x720-1.jpg",},
    
  ]

