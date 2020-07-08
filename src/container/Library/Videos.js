import React, { Component } from "react";
import { View, ImageBackground,Image, FlatList,Dimensions, Alert, BackHandler, AsyncStorage} from 'react-native';
import { Container, Header, Content, Accordion,Left,Button,Body,Icon,Separator,Title, Right, Spinner,ListItem, Switch } from "native-base";
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from '../../config/style';
import VideoComponent from '../../components/VideoComponent'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isremember : false,
      toggle : false,
      videolist : null
    };  
  }
  getVideosList = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/videos")
    .then(response => response.json())
    .then(data => { 
      // console.log("TL getVideosList : ",JSON.stringify(data));
      this.setState({loading : false, videolist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})        
      console.log("TL getVideosList ERROR : ", error);          
    });
  }

  componentWillMount(){
    this.getVideosList();
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

  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#724894" />
  }
  render() {
    const { loading,videolist } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}> Videos</Title>
          </Body>
          <Right> 
            {/* <Button transparent onPress={()=> { Actions.jump("notifications") }} >
              <Icon name='search' type="EvilIcons" style={{ color :"#fff" }}  />              
            </Button>          */}
          </Right>
        </Header>
        <Content>
        { videolist!=null && <FlatList 
              showsVerticalScrollIndicator={false}
              data={videolist}
              renderItem={({ item }) => <VideoComponent color={true} 
              post_image = {item.image}  
              post_title = {item.title}
              post_time = {item.post_date} 
              // post_description = {item.post_content}                                    
            /> }
              keyExtractor={(item, index) => {
                return item.ID;
              }}                    
        />}
       
       
        </Content>
       
      </Container>
    );
  }
}