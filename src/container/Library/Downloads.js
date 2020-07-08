import React, { Component } from "react";
import { View, ImageBackground,Image, FlatList,Dimensions, Alert, BackHandler, AsyncStorage} from 'react-native';
import { Container, Header, Content,Thumbnail,Text, Accordion,Left,Button,Body,Icon,Separator,Title, Right, Spinner,ListItem, Switch } from "native-base";
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from '../../config/style';
import DownloadListComponent from '../../components/DownloadListComponent';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Downloads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      message : false,  
      downlist : null        
    };
  }
  getDownloads=()=>{
    AsyncStorage.getItem('usertoken').then(res => {    
      console.log("TL token : ", res )  
      var formData = new FormData();    
      formData.append("token", res ); 
      // formData.append("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90dW5lc2xpYmVyaWEuYmV0YXBsYW5ldHMuY29tIiwiaWF0IjoxNTg5MDA1NjcwLCJuYmYiOjE1ODkwMDU2NzAsImV4cCI6MjIxNjkzMDQ3MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMyJ9fX0.MbBYwVi0WW9BTz_IXP-t72aA6y5EGQ1Gwon7i7yOo24" ); 
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getdownloads", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => { 
        if(data.status=="ok")
        {
          console.log("TL downloads :", JSON.stringify(data.musicslist));
          this.setState({ downlist : data.musicslist });    
        }  
        else
        {
            this.setState({ message : data.msg  }) 
        }       
      })
      .catch((error) => {         
        console.log("TL getdownloads ERROR : ", error);                
      });
    }); 
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.getDownloads();
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
    const { loading, downlist, message } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}> Downloads</Title>
          </Body>
          <Right> 
            {/* <Button transparent onPress={()=> { Actions.jump("notifications") }} >
              <Icon name='search' type="EvilIcons" style={{ color :"#fff" }}  />              
            </Button>          */}
          </Right>
        </Header>
        <Content>
        { message && <View style={{marginVertical:5,paddingHorizontal:10}}>
               <ListItem thumbnail noBorder >              
              <Left>              
                <Thumbnail square source={require("../../assets/images/localmusic.png")} style={{borderRadius:8,width:(SCREEN_WIDTH*18)/100,height:(SCREEN_WIDTH*18)/100}} />                
              </Left>
              <Body>
                <Text style={{color:"white",marginBottom:2,fontWeight:'bold'}}>{message}</Text>
                {/* <Text note numberOfLines={1} style={{fontWeight:'bold'}}>{artist}</Text> */}
              </Body>
              
              <Right>             
                
              </Right>
            </ListItem>
           </View>   
           }
        { downlist &&  <View>
        <FlatList 
             showsVerticalScrollIndicator={false}    
              data={downlist}
              renderItem={({ item }) =>  <DownloadListComponent
                music={downlist}
                post_id = {item.id}  
                post_title={item.title}               
                artist={item.artist}
                post_image={item.artwork}
                post_file = {item.url}                
              />            
              }
              keyExtractor={(item, index) => {
                return item.id;
              }}                              
            />
        </View>  }       
        </Content>       
      </Container>
    );
  }
}