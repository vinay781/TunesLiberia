import React, { Component ,Fragment} from 'react';
import { View ,ImageBackground,TouchableOpacity,FlatList, Image,AsyncStorage,BackHandler,Dimensions, Alert} from 'react-native';
import { Container, Header, Content,Form ,Input,Item, Footer,Left,Right,Body,Title, FooterTab, Button, Icon, Text,Card, CardItem, Thumbnail, ListItem, List, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import SeeAllComponent from '../components/SeeAllComponent';
import theme from '../config/theme';
import {styles} from '../config/style';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class FullView extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      catlist : null      
    };     
  }
  
  loadCategoryData = (title, category) => {    
    console.log("TL lCD : http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/"+ category +"?category=" + title)
    fetch("http://tunesliberia.betaplanets.com/wp-json/mobileapi/v1/"+ category +"?category=" + title)
    .then(response => response.json())
    .then(data => { 
      // console.log("TL getAlbumList : ",JSON.stringify(data));
      this.setState({loading : false, catlist:data.list})          
    })
    .catch((error) => { 
      this.setState({ loading : false})        
      console.log("TL getAlbumList ERROR : ", error);          
    });
  }


  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
    console.log("TL fullview : ", this.props.taxanomy);
    this.loadCategoryData(this.props.title, this.props.taxanomy);
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
    const { title, name, image, taxanomy } = this.props;
    const { catlist } = this.state;
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
        <View style={styles.containerInnerImageAlbums} >
            <View  style={styles.imageOuterViewAlbums}>
              <Image                          
                source={{uri :image}}                       
                style={styles.AlubmsImage}   
              />
            </View>
            <View style={styles.textTitleAlbums} >
              <Text style={styles.titleAlbums}>  {title}</Text> 
            {/* <Text style={styles.titleAlbumsviews}>56k+ Favorites | 18M+ Playouts</Text> */}
            </View>
        </View>
         {/* <View style={{flexDirection:"row",justifyContent:"space-between",paddingHorizontal:(SCREEN_WIDTH*20)/100,paddingVertical:10}}>
           <View style={{alignItems:"center"}}>
           <Icon name='favorite-border' type="MaterialIcons" style={{ color :"#fff" }}  />
           </View>
           <View style={{alignItems:"center"}}>
            <Button  style={{width:(SCREEN_WIDTH*30)/100,height:30,borderRadius:20,paddingHorizontal:"10%",backgroundColor:theme.PINK_COLOR}} 
            //  onPress={()=>Actions.jump('editprofile',{ id : id, username : name, phone : phone, image : image,email:email})}
            >
              <Text style={{color:'white',alignSelf:"center" }}>Play All</Text>
            </Button>
           </View>
           <View style={{alignItems:"center"}}>
           <Icon name='share-2'  type="Feather" style={{ color :"#fff" }}  />
           
           </View>
       </View> */}
       { catlist && <View>
          <FlatList 
            showsVerticalScrollIndicator={false}                  
            data={catlist}
            renderItem={({ item }) =>   <SeeAllComponent
            music={catlist}
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
        }
                   
        </Content>              
        </Container>

    );
  }
}

