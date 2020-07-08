import React, { Component } from 'react';
import Auth from './container/Auth';
import SignIn from  './container/SignIn' ;
import SignUp from  './container/SignUp' ;
import Home from './container/Home';
import Profile from './container/Profile';
import Playlist from './container/Playlist';
import Library from './container/Library';
import Buzz from './container/Buzz';
import Notification from './container/Notification';
import Search from './container/Search';
import EditProfile from  './container/EditProfile';
import ChangePassword from  './container/ChangePassword';
import ForgotPassword from './container/ForgotPassword';
import SeeAll from  './container/SeeAll';
import FullView from  './container/FullView';
import SelectPlaylist from  './container/SelectPlaylist';

import Downloads from  './container/Library/Downloads';
import Favourites from  './container/Library/Favourites';
import MyPlaylists from  './container/Library/MyPlaylists';
import MyPlaylistSongs from  './container/Library/MyPlaylistSongs';
import Videos from  './container/Library/Videos';

import LandingScreen from "./react/screens/LandingScreen";
import PlaylistScreen from "./react/screens/PlaylistScreen";
import VideoPlayer from "./container/VideoPlayer";

import {Router,Scene, Modal, Tabs} from 'react-native-router-flux';
const Routes = () => (
<Router>
   <Scene hideNavBar={true}>
      <Scene key="auth">
        <Scene key="login" component={SignIn} hideNavBar />
      </Scene>  
      <Scene key="signup"  component={SignUp} title="SignUp" hideNavBar={true}  />     
               
      <Scene key="profile" component={Profile} title="Profile"/>       
      <Scene key="buzz" component={Buzz} title="Buzz"/>      
      <Scene key="library" component={Library} title="Library"/>           
      <Scene key="notification" component={Notification} title="Notification"/> 
      <Scene key="editprofile" component={EditProfile} title="Edit Profile"/>    
      <Scene key="seeall" component={SeeAll} title="See All"/>     
      <Scene key="fullview" component={FullView} title="FullView"/>     
      <Scene key="videoplayer" component={VideoPlayer} title="Video Player"/> 
      <Scene key="favourites" component={Favourites} title="Favorite"/>        
      <Scene key="myplaylists" component={MyPlaylists} title="My Playlists"/> 
      <Scene key="selectplaylist" component={SelectPlaylist} title="Select Playlist"/> 
      <Scene key="videos" component={Videos} title="Videos"/> 
      <Scene key="landingscreen" component={LandingScreen} title="Landing Screen"/>                           
      <Scene key="forgotpassword" component={ForgotPassword} title="Forgot Password"/>            
      <Scene key="changepassword" component={ChangePassword} title="Change Password"/>     
       
        <Scene key="myplaylistsong" component={MyPlaylistSongs} title="" hideNavBar={true}/>  

      <Modal>
        <Scene key="home" component={Home} title="" hideNavBar={true} />   
        <Scene key="downloads" component={Downloads} title="" hideNavBar={true}/>        
        <Scene key="playlist" component={Playlist} title="" hideNavBar={true}/>  
        <Scene key="search" component={Search} title="" hideNavBar={true}/>  
        <Scene key="playlistscreen" component={PlaylistScreen} title="" hideNavBar={true}/>                  
      </Modal>      
      <Scene key="checkauth"  
        initial={true} 
        component={Auth} 
        hideNavBar 
      />        
   </Scene>
</Router>     
)
export default Routes ;