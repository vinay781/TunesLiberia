import React, { Component, Fragment } from "react";
import { View,Modal,ImageBackground,Image,TouchableHighlight,FlatList,Dimensions, Alert, BackHandler, AsyncStorage} from 'react-native';
import { Container, Header, Content,Form, Item, Input,Button,Separator,Title, Card, CardItem, Text, Icon,Left,Body,Right, Spinner,ListItem, Switch } from "native-base";
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from '../../config/theme';
import {styles} from '../../config/style';
import PlaylistComponent from '../../components/PlaylistComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class MyPlaylists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      playlist : null,
      modalVisible : false       
    };
  }
  getPlaylistByUser=()=>{
    AsyncStorage.getItem('usertoken').then(res => {    
      console.log("TL token : ", res )  
      
      var formData = new FormData();    
      formData.append("token", res ); 

      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/getPlaylistByuser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => { 
        console.log("TL getPlaylistByUser :", JSON.stringify(data.playlist))        
        this.setState({ playlist : data.playlist  })    
        
      })
      .catch((error) => {         
        console.log("TL getPlaylistByUser ERROR : ", error);                
      });
    }); 
  }

  createPlaylist(title) {
    console.log("TL title : ", title);
    AsyncStorage.getItem('usertoken').then(res => {    
      console.log("TL token : ", res )  
      
      var formData = new FormData();    
      formData.append("token", res );       
      formData.append("title", title );

      this.setState({ loading : true })      
      fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/createPlaylistByUser", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
      .then(response => response.json())
      .then(data => { 
        console.log("TL createPlaylist :", JSON.stringify(data)) 
        this.setState({ modalVisible : false ,loading : false });
        if(data.status=="ok")
        {                       
          Alert.alert(
            "Success",
            data.msg,
            [{
              text: "OK",
              style: "cancel"
              },                  
            ],
            { cancelable: true }
          )
          this.getPlaylistByUser();
        }        
      })
      .catch((error) => {         
        console.log("TL createPlaylist ERROR : ", error); 
        this.setState({ modalVisible : false ,loading : false });              
      });
    }); 
  }

  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.getPlaylistByUser();
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
    return  <Spinner style={styles.loadingContainer} color="#0A151F" />
  }
  render() {
    const { loading, playlist, modalVisible } = this.state
    return (
        <Container style={styles.containerMainDiscover} >
        <Header transparent>
        <Left>
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' style={{ color :"#fff" }}  />
            </Button>
        </Left>
          <Body>
            <Title style={{color:"white"}}> My Playlists</Title>
          </Body>
          <Right>            
          </Right>
        </Header>
        <Content>
          <TouchableHighlight activeOpacity={0.6}  onPress={() => this.setState({ modalVisible : true })}>
            <Card style={{ backgroundColor:"#0A151F", borderColor :"#0A151F"}}>
              <CardItem style={{ backgroundColor:"#0A151F", }}>
                <Left>
                  <Icon style={{ color:"#fff",fontSize: 20, backgroundColor:"#326799", padding : 10 }} name="plus" type="FontAwesome5" />
                  <Body>
                    <Text style={{ color:"#fff", fontSize : 18}} > Create Playlist </Text>                  
                  </Body>
                </Left>              
              </CardItem>
            </Card>
          </TouchableHighlight>
          { playlist &&  <View>
            <FlatList 
                showsVerticalScrollIndicator={false}    
                  data={playlist}
                  renderItem={({ item }) =>  <PlaylistComponent                    
                    post_id = {item.id}  
                    post_userid = {item.user_id}  
                    post_title={item.playlist_title}               
                    post_date={item.date}               
                  />            
                  }
                  keyExtractor={(item, index) => {
                    return item.id;
                  }}                              
                />
            </View>
            }
             
        </Content>
          <Modal 
            animationType="slide"
            transparent={true}
            presentationStyle="overFullScreen"
            // visible={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
              <View style={{ height:(SCREEN_HEIGHT*100)/100, backgroundColor : "transparent" }}>
                <View style={styles.maincontainerModal}>  
                  <View style={{ width : "100%"}}>
                    <Button transparent style={{ width : "15%"}} onPress={()=>  this.setState({ modalVisible : false })} >
                        <Icon name='close' style={{ color :"#000" }}  />            
                    </Button>                
                  </View>             
                  <View style={{ height:"80%", width: "100%", justifyContent : "center", alignContent : "center" }}>
                  <Formik
                    initialValues={{ title : "" }}                
                    onSubmit={(values) => { this.createPlaylist(values.title)  }}
                    validationSchema={yup.object().shape({
                      title: yup  
                        .string()               
                        .trim()                       
                        .required('Please Enter Title')      
                    })}
                    >
                    {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <Fragment>
                    <View style={{width:"70%",height:"10%",justifyContent:"center", paddingHorizontal:"8%", flexDirection:"row", alignItems:"center"}}>
                      <Item>                    
                        <Input 
                            style={styles.formInputs} 
                            placeholder='Playlist Name'
                            value={values.title}
                            onChangeText={handleChange('title')}
                            onBlur={() => setFieldTouched('title')}
                            underlineColor="transparent"                 
                            // autoCapitalize="none"                                                                
                          />
                          { touched.title && errors.title &&
                            <Text style={styles.errorInput} >{errors.title}</Text>
                          }
                      </Item>
                  
                    </View>
                    { loading && this.renderLoader() }
                      <View style={{ marginTop : 20,justifyContent:"center", alignContent:"center"}}>                       
                        <View  style={{paddingBottom: 20,paddingTop:10}}>
                          <Button style={styles.logOutButton} onPress={handleSubmit}>
                            <Text style={styles.linkTextLo} > SAVE </Text>
                        </Button> 
                        </View>
                      </View>
                    </Fragment>
                      )}
                  </Formik>  

                  </View>                  
                </View>
              </View>
          </Modal>
      </Container>
    );
  }
}