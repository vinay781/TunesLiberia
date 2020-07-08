import {StyleSheet, Dimensions, Platform} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    postTitle : { color:"#fff", fontSize : 10, fontWeight:"bold"},
    postName : { fontSize : 10},
    bottomText : { backgroundColor :"#0A151F", paddingVertical : 5},
    albumCard : { elevation: 3, backgroundColor:"#0A151F", borderColor :"#0A151F" },
    albumCardItem : { backgroundColor:"#0A151F", },
    albumContainer : { marginHorizontal:5, backgroundColor:"#0A151F" }
});