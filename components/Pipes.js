import React from 'react';
import { View } from 'react-native';
import pipeLow from '../images/bottompipe.png'
import pipeTop from '../images/toppipe.png'

const Pipes = ({pipesLeft, pipesWidth, pipesHeight, gap, randBottom}) =>{
return(
   <>
      <View style={{
       position: 'absolute',
       backgroundImage: "url(" + pipeTop + ")",
       backgroundPosition: 'center',
       backgroundSize: 'cover',
       backgroundRepeat: 'no-repeat',
       width: pipesWidth,
       height: 450,
       left: pipesLeft,
       bottom: randBottom + pipesHeight + gap, 
      }}> </View>

      <View style={{
       position: 'absolute',
       backgroundImage: "url(" + pipeLow + ")",
       backgroundPosition: 'center',
       backgroundSize: 'cover',
       backgroundRepeat: 'no-repeat',
       width: pipesWidth,
       height: pipesHeight,
       left: pipesLeft,
       bottom: randBottom, 
      }}> </View>
   </>
)} 
export default Pipes