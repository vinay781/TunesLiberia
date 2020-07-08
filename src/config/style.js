import {StyleSheet, Dimensions, Platform} from 'react-native';
import theme from './theme';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    containerMain : {
        flex:1,        
        backgroundColor : theme.DEFAULT_COLOR,
        height : (SCREEN_HEIGHT * 100) / 100,  
        width  :(SCREEN_WIDTH * 100) / 100,     
        backgroundColor: 'transparent',
        justifyContent : "center",
        alignItems : "center"      
        
    },
    outerSignIn : {
      marginTop : (SCREEN_HEIGHT * 12) / 100,
      // backgroundColor : "blue",
    },
    containerMainDiscover: {
      flex:1,        
      backgroundColor : theme.DEFAULT_COLOR,
      height : (SCREEN_HEIGHT * 100) / 100,  
      width  :(SCREEN_WIDTH * 100) / 100,     
      // backgroundColor: 'transparent',
  },
    containerInnerSignup : {
      width : (SCREEN_WIDTH * 80) / 100,  
      paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
      borderRadius:38,      
      backgroundColor : theme.WHITE_COLOR,
      marginTop:(SCREEN_HEIGHT * 12) / 100
    },
    containerInner : { 
        width : (SCREEN_WIDTH * 80) / 100,  
        height : (SCREEN_HEIGHT * 58) / 100,  
        paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
        borderRadius:38,      
        backgroundColor : theme.WHITE_COLOR,
        marginTop:(SCREEN_HEIGHT * 13) / 100,   
        // backgroundColor : "yellow"
    },
    containerInnerSignIn : { 
      width : (SCREEN_WIDTH * 80) / 100,  
      height : (SCREEN_HEIGHT * 62) / 100,  
      paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
      borderRadius:38,      
      backgroundColor : theme.WHITE_COLOR,
      justifyContent : "flex-end"
  },
    containerInnerimg : { 
        // width : (SCREEN_WIDTH * 100) / 100,  
        height : (SCREEN_HEIGHT * 18) / 100,         
        alignItems:"center",
        marginTop:50,
        marginBottom:40
        
    },    
    logoSignIn: {        
        width :"80%",
        height :"100%",        
        resizeMode: 'contain',
        //  backgroundColor : "red",
      },   
    inputItem: {
     marginBottom:15,
     height : (SCREEN_WIDTH * 12) / 100,   
    },
    // inputItem: {
    //   marginBottom: 20,
    //   backgroundColor:theme.WHITE_COLOR     
    // },
    footerSize:{
      backgroundColor:'transparent',
      borderTopWidth:0,
      // height: (SCREEN_WIDTH * 15) / 100,
      height: 70,
      position:"relative"

    },
    footerIcon:{
      fontSize: (SCREEN_WIDTH * 5) / 100, 
      color: '#fff'
    },
    // submitButton: {
    //     marginBottom: 15,
    //     height : (SCREEN_WIDTH * 12) / 100,
    //     backgroundColor:theme.PINK_COLOR,
    //     borderRadius:50
    //    },
     bottomTextTermsConditionsSignIn : {
        flexDirection : "row",  
        height : (SCREEN_WIDTH * 20) / 100,
        justifyContent : "center",
        alignItems : "center"
      },
      bottomTextTermsConditions : {
        flexDirection : "row",  
        height : (SCREEN_WIDTH * 20) / 100,
        justifyContent : "center",
        // backgroundColor : "red",
        alignItems : "center"
              
      },
      buttonTermsConditions : {
        paddingRight : (SCREEN_WIDTH * 2) / 100,
        alignItems : "center",
      },
      
      footerLinkText : {
        color : theme.WHITE_COLOR,
        // backgroundColor : "black",
        height : 40,  
        paddingVertical : 10,
        paddingHorizontal : 6     
      },
      bottomLinks:{ 
        marginTop : 50,
        justifyContent : "center",
        alignItems:"center"
      },
      errorInput : {        
        color : "red",         
        position : "absolute",
        bottom : 0,
        left : 50        
    },
//  ============= **** ============
  //     MyAccount
  //  ============= **** ============

  
  containerInnerImage : {
    width : (SCREEN_WIDTH * 100) / 100,
    height : (SCREEN_HEIGHT * 20) / 100,
     paddingTop:30,
    alignItems:"center",
    justifyContent:"center",
    // backgroundColor : "red"
  },
  imageEditMyAccount : {
    width : "100%",
    height : "100%",   
    borderRadius:100,
   // marginTop:10,     
    resizeMode:'stretch',  
  },
  accountProfileImage  :{
    width : "100%",
    height : "100%", 
   // marginTop:10,       
    // resizeMode: 'contain',
    borderRadius : 100
  },
imageOuterView:{
  width : (SCREEN_WIDTH * 35) / 100,
  height : (SCREEN_WIDTH * 35) / 100,
},
textTitleMyAccount : {
  width : (SCREEN_WIDTH * 100) / 100,
  height : (SCREEN_HEIGHT * 8) / 100, 
  paddingVertical :  (SCREEN_WIDTH * 5) / 100, 
  
},
titleMyAccount : {
    height : (SCREEN_HEIGHT * 8) / 100,
    width : (SCREEN_WIDTH * 100) / 100,
    fontWeight: "bold",
    fontSize:(SCREEN_WIDTH * 5) / 100,
    textAlign:"center",
},
inputItemMA: {
  marginBottom:15,
  height : (SCREEN_WIDTH * 15) / 100,   
 },
 logOutButton: {
  marginHorizontal: 30,
  height : 50,
  backgroundColor:theme.DEFAULT_COLOR,
  borderRadius:20,
  marginBottom: 20,
  borderWidth : (SCREEN_WIDTH * 0.5) / 100,
  borderColor : theme.PINK_COLOR,
  justifyContent : "center"
 },

// calender
containerForm:{
  paddingHorizontal:(SCREEN_WIDTH*5)/100,
  paddingTop:15,

},
dropDownPicker : { 
  width: (SCREEN_WIDTH*80)/100,
},
inputTextra: {    
  backgroundColor:theme.WHITE_COLOR,
  borderRadius:15,
  paddingLeft : 20, 
  fontSize : 12,
  height : 100
},
inputLabel: {
  marginHorizontal:15,
  marginBottom: 8,
  fontSize : 14,
  fontWeight:"500"
},
errorInput : {        
  color : "red",         
  position : "absolute",
  bottom : 0,
  right : 12        
},
imageEditSchedule : {
  width : (SCREEN_WIDTH * 20) / 100,
  height : (SCREEN_HEIGHT * 10) / 100,        
  resizeMode: 'contain'
},
cameraItem:{
  alignItems:'flex-start',
//backgroundColor:"red"
},
submitButton: {
  marginVertical:20,
  marginHorizontal:20,
  height:50,
  backgroundColor:theme.PINK_COLOR,
  borderRadius:20
},
linkText : {
  color : theme.WHITE_COLOR,
  fontWeight : "bold",      
},
linkTextLo : {
  color : theme.PINK_COLOR,
  fontWeight : "bold",      
},
formInputs : { 
  paddingLeft : 20, 
  fontSize : 12
},

/////calendar
calendar:{
width : (SCREEN_WIDTH * 100) / 100,
 
// backgroundColor:'red'
},
calendarComponent : {
width : (SCREEN_WIDTH * 100) / 100,   
// height : (SCREEN_HEIGHT * 49) / 100,
paddingVertical : 0,
// backgroundColor:"blue"
},
calendarInner:{
width : (SCREEN_WIDTH * 100) / 100,
// height : (SCREEN_HEIGHT * 43) / 100,

},
timeInner:{
width : (SCREEN_WIDTH * 100) / 100,  
paddingHorizontal:(SCREEN_WIDTH * 10) / 100,
// marginTop: (SCREEN_HEIGHT * 6) / 100,
paddingTop: (SCREEN_HEIGHT * 2) / 100,
borderTopColor : "#ccc",
borderTopWidth : 1,  
// backgroundColor:'blue'
},
timeButton:{
  borderRadius:20,
  width : (SCREEN_WIDTH * 24) / 100,
  marginLeft:(SCREEN_WIDTH * 2) / 100,
  marginBottom:(SCREEN_WIDTH * 2) / 100
},
timeButtonActive:{
  borderRadius:20,
  width : (SCREEN_WIDTH * 24) / 100,
  marginLeft:(SCREEN_WIDTH * 2) / 100,
  marginBottom:(SCREEN_WIDTH * 2) / 100,
  backgroundColor : theme.PURPLE_COLOR 
},
timeText : {
  color : "#000"
},
timeTextActive : {
  color : "#fff",
  fontWeight : "bold"
},
containerButton:{
  flexDirection:"row",
  marginVertical:(SCREEN_WIDTH * 2) / 100,
},
////modal
maincontainerModal:{
  marginTop: (SCREEN_WIDTH*30)/100,
  marginHorizontal:(SCREEN_WIDTH*5)/100,
  width:(SCREEN_WIDTH*90)/100,
  height:(SCREEN_HEIGHT*35)/100, 
  alignItems:"center", 
  backgroundColor:theme.WHITE_COLOR,
  borderRadius:20,
  shadowColor: "#000",
shadowOffset: {
width: 0,
height: 10,
},
shadowOpacity: 0.53,
shadowRadius: 13.97,

elevation: 21,
},

containerInnerimgModal : { 
  width : "100%",  
  height : (SCREEN_HEIGHT*20)/100,         
  alignItems:"center",
  paddingVertical:5
  
 
  
},    
logoSignInModal: {        
height : "100%", 
width : "100%",
        
  resizeMode: 'contain',
  //  backgroundColor : "red",
},   
submitButtonModal: {
  marginVertical:5,
  backgroundColor:theme.PINK_COLOR,
  borderRadius:50,
  marginHorizontal:"20%"
  
 },
 linkTextModal: {
  color : theme.WHITE_COLOR,
  fontWeight : "bold",      
},
containerInnerForgotPassword : { 
  width : (SCREEN_WIDTH * 80) / 100,  
  height : (SCREEN_HEIGHT * 58) / 100,  
  paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
  borderRadius:38,      
  backgroundColor : theme.WHITE_COLOR,
},

///===============change password =============///
containerInnerchangePassword : { 
  width : (SCREEN_WIDTH * 80) / 100,  
  height : (SCREEN_HEIGHT *70) / 100,  
  paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
  borderRadius:38,      
  backgroundColor : theme.WHITE_COLOR,
},
changePasswordButton:{
  height:45,
  // marginTop:"5%",
  marginHorizontal:20,
  backgroundColor:theme.PINK_COLOR,
  borderRadius:20
},
cancelChangePasswordButton:{
  height:45,
  marginTop:"5%",
  marginHorizontal:20,
  backgroundColor:theme.WHITE_COLOR,
  borderRadius:20,
  borderWidth:(SCREEN_WIDTH*0.5)/100,
  borderColor:theme.PINK_COLOR
},
homeSliderHeader : { height : 25, marginTop : 5 },
sliderHeaderLeft : { height : 25},
homeSeeAllButton : { color:"#ccc",fontWeight:"600",fontSize:(SCREEN_WIDTH*2)/100},

/* FullView */
imageOuterViewAlbums:{
  width : (SCREEN_WIDTH * 45) / 100,
  height : (SCREEN_WIDTH * 45) / 100
},

AlubmsImage :{
  width :  "100%",
  height :  "100%", 
  borderRadius:15,  
  // resizeMode: 'contain',

},

containerInnerImageAlbums : {

  width : (SCREEN_WIDTH  *100) / 100,

  // height : (SCREEN_HEIGHT  25) / 100,

  paddingTop:25,

  alignItems:"center",

  justifyContent:"center",


},
textTitleAlbums : {
  width : (SCREEN_WIDTH  *100) / 100,
  paddingVertical : (SCREEN_WIDTH  *5) / 100
},
titleAlbums : {
  fontWeight: "bold",
  fontSize:(SCREEN_WIDTH* 6) / 100,
  color:"white",
  textAlign:"center"
},
titleAlbumsviews:{
  marginVertical:7,
  fontWeight: "bold",
  fontSize:(SCREEN_WIDTH * 4) / 100,
  color:theme.DARK_GREY_COLOR,
  textAlign:"center"
},
// ******************************* modal ****************
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
  
},
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 5,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
},
openButton: {
  backgroundColor: "#F194FF",
  borderRadius: 20,
  padding: 10,
  elevation: 2
},
textStyle: {
  
  fontWeight: "bold",
  textAlign: "center",
  fontSize:(SCREEN_WIDTH*5)/100
},
modalText: {
  marginBottom: 15,
  textAlign: "center"
}
       

});
