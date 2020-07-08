import React, { Component, Fragment } from "react";
import { View, Text , BackHandler, ImageBackground, Image, Alert, Modal, Dimensions, AsyncStorage} from 'react-native';
import { Container, Header,Icon, Content, Form, Item, Input,ListItem,  Radio, Right, Left ,Button,Spinner  } from 'native-base';
import {Actions} from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from  '../config/theme';
import {styles} from '../config/style'

const FORGET_PASSWORD_SCHEMA = yup.object().shape({  
  confirm_email: yup.string().email('Invalid email').required('Required')
});

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isremember : false,
      loading : false,
      modalVisible: false
    };
  }
  
  componentWillMount(){     
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    console.log("TL SignIn component WillMount", this.backHandler );
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    console.log("TL SignIn component DidMount");
  }
  componentWillUnmount() {
    console.log("TL SignIn component WillUnmount");
    this.backHandler.remove();
  }
  handleBackPress = () => {
     Alert.alert(
      'Exit App',
      'Exiting the application?', [{
          text: 'Cancel',
          onPress: () => { console.log('SignIn Cancel Pressed') },
          style: 'cancel'
      }, {
          text: 'OK',
          onPress: () => { BackHandler.exitApp()}
      }, ], {
          cancelable: false
      }
    )    
     return true;
  }
  rememberMe(isremember){
    console.log("TL rememberMe : ", isremember); 
    this.setState({ isremember : !isremember})
  }

  usersignin(val)
  {  
    console.log("TL usersignin : ", JSON.stringify(val)); 
    
    var formData = new FormData();    
    formData.append( "username", val.email );       
    formData.append( "password", val.password );   
    this.setState({ loading : true})
    fetch("http://tunesliberia.betaplanets.com/wp-json/jwt-auth/v1/token", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    .then(response => response.json())
    .then(data => { 
      console.log("TL usersignin data : ",JSON.stringify(data));
      this.setState({ loading : false})
      if(data.token) {  
        var usertoken = data.token;    
        AsyncStorage.setItem("usertoken", usertoken);     
        Actions.jump('home')            
      } else {
        Alert.alert(
          'Incorrect Pasword',
          'The email address and password is mismatched or incorrect.',
          [{
            text: "OK",
            style: "cancel"
            },                  
          ],
          { cancelable: true }
        )
      }
    })
    .catch((error) => {    
      this.setState({ loading : false})     
      console.log("TL usersignin ERROR : ", error);    
      Alert.alert(
        "",
        "Connection Lost",
        [{
          text: "OK",
          style: "cancel"
          },                  
        ],
        { cancelable: true }
      )      
    })    
  }

  isemail(val){
    console.log("TL isemail : ", JSON.stringify(val));        
    // AsyncStorage.getItem('usertoken').then(res => {      
    //   var formData = new FormData();    
    //   formData.append("token", res ); 
    //   formData.append("email", val.confirm_email );  
    //   this.setState({ modalVisible: false , loading : true });  
    //   fetch("http://nomorescars.betaplanets.com/wp-json/mobileapi/v1/forgot_password", { method: 'POST', headers: {'Content-Type': 'multipart/form-data', }, body: formData })
    //   .then(response => response.json())
    //   .then(data => { 
    //     console.log("TL isemail data : ",JSON.stringify(data));
    //     this.setState({ loading : false });
    //     //  implement the success code after mail sent 
    //     if(data.status=='success'){
    //       Alert.alert(
    //         'Success',
    //         data.msg,
    //         [{
    //           text: "OK",
    //           onPress: () => { console.log('SignIn Cancel Pressed') },
    //           style: "cancel"
    //          },                  
    //         ],
    //         { cancelable: true }
    //       )          
    //     }
    //     else
    //     {
    //       Alert.alert(
    //         'User not Exists',
    //         data.msg,
    //         [{
    //           text: "OK",
    //           style: "cancel"
    //          },                  
    //         ],
    //         { cancelable: true }
    //       )
    //     }
       
    //   })
    //   .catch((error) => {         
    //     console.log("TL isemail ERROR : ", error);          
    //     this.setState({ loading : false });
    //     Alert.alert(
    //       "",
    //       "Connection Lost",
    //       [{
    //         text: "OK",
    //         style: "cancel"
    //         },                  
    //       ],
    //       { cancelable: true }
    //     )
    //   });
    // }); 
  }

  renderLoader(){
    return  <Spinner style={styles.loadingContainer} color="#fff" />
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { isremember, loading } = this.state
    return (
    <ImageBackground source={theme.BACKGROUND} style={{width: '100%', height: '100%'}}>
      <Container style={styles.containerMain}>
        <Content showsVerticalScrollIndicator ={false} > 
          <View style={styles.outerSignIn}>
          <View style ={styles.containerInnerSignIn}>            
            <View style={styles.containerInnerimg} >
                <Image
                  source={theme.LOGO_APP}                       
                  style={styles.logoSignIn}       
                /> 
             </View>
             {/* <View style={styles.formInputsSignIn}> */}
              <Formik
                  initialValues={{ email: "", password: "" }}                
                  // initialValues={{ email: "test@gmail.com", password: "ntf12345" }}                
                  onSubmit={values => this.usersignin(values)}
                  validationSchema={yup.object().shape({
                    email: yup
                      .string()
                      .email('Enter valid email address!')
                      .trim()
                      .required('Email address is required!'),
                    password: yup
                      .string()
                      .trim()
                      .required('Password is required!')                
                  })}
                  >
                  {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <Fragment>
                  <Form>
                  <Item  style={styles.inputItem} >
                    <Icon name='envelope' type="EvilIcons" />
                    <Input 
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={() => setFieldTouched('email')}
                      placeholder="Email address"
                      // selectionColor="#ffffff"                                        
                      underlineColor="transparent"                 
                      autoCapitalize="none"
                    />
                    { touched.email && errors.email &&
                      <Text style={styles.errorInput} >{errors.email}</Text>
                    }
                  </Item>
                  <Item style={styles.inputItem} >
                    <Icon  name='lock' type="EvilIcons" />
                    <Input 
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password')}
                      placeholder="Password"
                      // selectionColor="#ffffff" 
                      underlineColor="transparent"                      
                      autoCapitalize="none"
                      secureTextEntry={true}                        
                    />
                    { touched.password && errors.password &&
                      <Text style={styles.errorInput} >{errors.password}</Text>
                    }  
                  </Item>                   
                  <Button full style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.linkText} >SIGN IN</Text>
                  </Button>                     
                  </Form>
                </Fragment>
                  )}
              </Formik>  
            {/* </View> */}
          </View>
          </View>
           { loading && this.renderLoader()}
              {/* <View style={styles.bottomTextTermsConditionsSignIn} >
                <Radio selected={isremember} selectedColor="#fff" style={styles.buttonTermsConditions} />
                <Text style={styles.linkText} onPress={() => this.rememberMe(isremember)} > Remember Me </Text>
              </View>  */}
          
           <View style={styles.bottomLinks}>
              <View style={styles.bottomTextTermsConditions}>      
                <Text style={{color : theme.WHITE_COLOR, height : 40,paddingVertical : 10}}>Need an Account?</Text>
                <Text style={{color : theme.WHITE_COLOR, height : 40,paddingVertical : 10,fontWeight:"bold"}} onPress={()=>Actions.jump('signup')} > Sign up </Text>                          
              </View>  
              <View>
              <Text style={styles.footerLinkText} onPress={() => { Actions.jump('forgotpassword')}}> Forgot Password</Text>   
              </View>  
           </View> 
                     
        </Content>
      </Container>
  </ImageBackground>
    );
  }
}
