import {StyleSheet, Dimensions, Platform} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    modalOuter : { height:(SCREEN_HEIGHT*100)/100, backgroundColor : "transparent", justifyContent : "center", alignItems : "center" },
    modalInner : { 
        marginTop: (SCREEN_HEIGHT*55)/100,         
        width:(SCREEN_WIDTH*100)/100,
        height:(SCREEN_HEIGHT*45)/100, 
        alignItems:"center", 
        backgroundColor:"#fff", 
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.53,
        shadowRadius: 13.97, 
        elevation: 21 
    },   
    modalCloseButton : { width : "100%"},
    modalBody : { 
        backgroundColor:"blue", 
        height:"80%", width: "100%", flex: 1,
    alignItems: 'center' }, 

});