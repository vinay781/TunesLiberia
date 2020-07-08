import React, { Component ,Fragment} from 'react';
import {  StyleSheet, View,  FlatList,Dimensions,  TextInput, ActivityIndicator,BackHandler, Alert} from 'react-native';
import { Container, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, FooterTab, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import theme from '../config/theme';
import {styles} from '../config/style';
import SeeAllComponent from '../components/SeeAllComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {newrelease : null, isLoading: true, text: '' };
    this.arrayholder = [];
  }
  getNewRelease = async () =>{
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/music")
    .then(response => response.json())
    .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            newrelease: responseJson.musicslist
          },
          function() {
            this.arrayholder = responseJson.musicslist;
          }
        );
      })
    .catch(error => {
      console.error(error);
    });
  }
  
 
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    this.getNewRelease();    
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

  searchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on newrelease
      //After setting the data it will automatically re-render the view
      newrelease: newData,
      text: text,
    });
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 50 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent >
          <Left>
            <Button transparent onPress={()=>Actions.pop()}>
              <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
          </Left>
          <Body>
            <Title style={{color:"white"}}>Search</Title>
          </Body>
          <Right>            
          </Right>            
        </Header>
        <Content style={{backgroundColor:theme.DEFAULT_COLOR}} >
          <View style={{ marginHorizontal : 20, paddingVertical : 20}}>
            <Item searchBar rounded>
              <Input 
                onChangeText={text => this.searchFilterFunction(text)}
                value={this.state.text}
                underlineColorAndroid="transparent"
                placeholder="Search songs" 
                selectionColor="#ffffff"
                placeholderTextColor="#ccc"
                style={{ color : "#fff", paddingLeft : 40}}
              />            
              <Button transparent>            
                <Icon name="ios-search" style={{ color: "#fff" }} />
              </Button>
            </Item>
          </View>
          <View style={{ marginHorizontal : 20}}>
            <FlatList 
                showsHorizontalScrollIndicator={false}              
                data={this.state.newrelease}
                renderItem={({ item }) => <SeeAllComponent
                  music={this.state.newrelease}
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
          </View>
        
                    
        </Content>              
      </Container>
    );
  }
}

