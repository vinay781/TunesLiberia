import React, { Component ,Fragment} from 'react';
import { View ,ImageBackground,TouchableOpacity,FlatList, Image,AsyncStorage,BackHandler, Alert} from 'react-native';
import { Container,Tab, Tabs,ScrollableTab,TabHeading, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, FooterTab, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
import ProfileComponent from '../components/ProfileComponent';

export default class Buzz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page : 0,
      data:null,
      loading : false,
    };
    
  }
  componentWillMount(){
    
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    if(this.state.page==0){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz?category=Entertainment", requestOptions)
      .then(response => response.json())
      .then(result =>{ console.log("result.list",result.list)
                    this.setState({data:result.list})})
      .catch(error => console.log('error', error));
    }
   
  
  
   
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

  tabChange(i){
    console.log("page",i)
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    if(i==0){
      this.setState({ loading : true})
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz?category=Entertainment", requestOptions)
      .then(response => response.json())
      .then(result => { console.log("result.list",result.list)
      this.setState({ loading : false})
      this.setState({data:result.list})})
      .catch(error => console.log('error', error));
    }
    if(i==1){
      this.setState({ loading : true})
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz?category=Sports", requestOptions)
      .then(response =>response.json())
      .then(result => { console.log("result.list",result.list)
      this.setState({ loading : false})
      this.setState({data:result.list})})
      .catch(error => console.log('error', error));
    }
    if(i==2){
      this.setState({ loading : true})
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz?category=Lifestyle", requestOptions)
      .then(response =>response.json())
      .then(result => { console.log("result.list",result.list)
      this.setState({ loading : false})
      this.setState({data:result.list})})
      .catch(error => console.log('error', error));
    }
    if(i==3){
      this.setState({ loading : true})
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/buzz?category=Following", requestOptions)
      .then(response =>response.json())
      .then(result => { console.log("result.list",result.list)
      this.setState({ loading : false})
      this.setState({data:result.list})})
      .catch(error => console.log('error', error));
    }
  }
  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#fff" />
  }
  render() {
        const{page,data,loading}=this.state
        console.log(page,"datalist",data)

    return (
    <Container style={styles.containerMainDiscover} >
    <Header transparent hasTabs>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}> Buzz</Title>
          </Body>
          <Right> 
            {/* <Button             
             transparent 
            // onPress={()=> { Actions.jump("notifications") }}
            >
              <Icon name='search' type="EvilIcons" style={{ color :"#fff" }}  />              
            </Button>          */}
          </Right>
        </Header>
        <Content style={{backgroundColor:theme.DEFAULT_COLOR,}} >
        
        <Tabs initialPage={page}  onChangeTab={({ i }) => this.tabChange(i)} tabBarTextStyle={{fontSize:100}}   tabBarBackgroundColor={theme.DEFAULT_COLOR}  renderTabBar={()=> <ScrollableTab style={{ borderWidth: 0}}  underlineStyle={{width:20,marginLeft:50, borderBottomWidth:0}} tabsContainerStyle={{backgroundColor:theme.DEFAULT_COLOR}} />} >

          <Tab heading="ENTERTAINMENT" tabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTextStyle={{color:"white",fontSize:10}}  style={{backgroundColor:theme.DEFAULT_COLOR, }} >
           
          <View style={{paddingHorizontal:15}}>          
          { loading && this.renderLoader()}
          { !loading &&<FlatList 
                      showsVerticalScrollIndicator={false}
                     
                      data={data}
                      renderItem={({ item }) => <ProfileComponent color={true}
                      post_image = {item.image}
                      post_description={item.content}
                      post_title = {item.title}
                    /> }
                      keyExtractor={(item, index) => {
                        return item.ID;
                      }}                    
                />}
                </View>

          </Tab>
          <Tab heading="SPORTS" tabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTextStyle={{color:"white",fontSize:10}} style={{backgroundColor:theme.DEFAULT_COLOR}}>
          <View style={{paddingHorizontal:15}}>          
          { loading && this.renderLoader()}
         { !loading &&<FlatList 
                      showsVerticalScrollIndicator={false}                     
                      data={data}
                      renderItem={({ item }) => <ProfileComponent color={true}
                      post_image = {item.image}
                      post_description={item.content}
                      post_title = {item.title}
                    /> }
                      keyExtractor={(item, index) => {
                        return item.ID;
                      }}                    
                />}
                </View>

          </Tab>
          <Tab heading="LIFESTYLE"  tabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTextStyle={{color:"white",fontSize:10}} style={{backgroundColor:theme.DEFAULT_COLOR}}>
          <View style={{paddingHorizontal:15}}>          
          { loading && this.renderLoader()}
         { !loading &&<FlatList 
                      showsVerticalScrollIndicator={false}                      
                      data={data}
                      renderItem={({ item }) => <ProfileComponent color={true}
                      post_image = {item.image}
                      post_description={item.content}
                      post_title = {item.title}
                    /> }
                      keyExtractor={(item, index) => {
                        return item.ID;
                      }}                    
                />}
                </View>

          </Tab>
          <Tab heading="FOLLOWING"  tabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTabStyle={{backgroundColor:theme.DEFAULT_COLOR}} activeTextStyle={{color:"white",fontSize:10}} style={{backgroundColor:theme.DEFAULT_COLOR}}>
          <View style={{paddingHorizontal:15}}>          
          { loading && this.renderLoader()}
          {!loading &&<FlatList 
                      showsVerticalScrollIndicator={false}
                      
                      data={data}
                      renderItem={({ item }) => <ProfileComponent color={true}
                      post_image = {item.image}
                      post_description={item.content}
                      post_title = {item.title}
                    /> }
                      keyExtractor={(item, index) => {
                        return item.ID;
                      }}                    
                />}
                </View>

          </Tab>
          
        </Tabs>
                   
        </Content>              
        </Container>

    );
  }
}
const DATA = [
  {  title: "A wonderful serenity has taken possession?", description:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor", image: "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/iTunes-Logo-Header-1280x720-1.jpg",},
  {  title: "A wonderful serenity has taken possession?", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor", image: "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/iTunes-Logo-Header-1280x720-1.jpg",},
  {  title: "A wonderful serenity has taken possession?", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor", image: "http://tunesliberia.betaplanets.com/wp-content/uploads/2020/05/iTunes-Logo-Header-1280x720-1.jpg",},
]