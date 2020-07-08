import React, { Component, useEffect } from 'react';
import Routes from './Routes';
//import SplashScreen from 'react-native-splash-screen'
import { Root } from "native-base";

const App = () => {

// useEffect(()=>{
//   SplashScreen.hide()
// });

  return(
    <Root>
      <Routes/>
    </Root>
  )
}
export default App;
