import React, { Component } from "react";
import { View, ImageBackground,Image, FlatList,Dimensions, Alert, BackHandler, AsyncStorage} from 'react-native';
import { Container, Header, Content, Thumbnail,Text,Accordion,Left,Button,Body,Icon,Separator,Title, Right, Spinner,ListItem, Switch } from "native-base";
import {Actions} from 'react-native-router-flux';
import theme from '../../config/theme';
import {styles} from '../../config/style';
import FavListComponent from '../../components/FavListComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      message : false,
      favlist : null        
    };
  }
  getFavourites=()=>{
    AsyncStorage.getItem('usertoken').then(res => {    
      console.log("TL token : ", res )  
      var formData = new FormData();    
      formData.append("token", res ); 

      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getfavourites", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => {  
        if(data.status=="ok")
        {
          console.log("TL getFavourites :", JSON.stringify(data.musicslist))        
          this.setState({ favlist : data.musicslist  })   
        }
        else
        {
            this.setState({ message : data.msg  }) 
        } 
      })
      .catch((error) => {         
        console.log("TL getFavourites ERROR : ", error);                
      });
    }); 
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.getFavourites();
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
    const { loading, favlist, message } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}> Favorite </Title>
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


        { favlist &&  <View>
          <FlatList 
            showsVerticalScrollIndicator={false}    
            data={favlist}
            renderItem={({ item }) =>  <FavListComponent
              music={favlist}
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