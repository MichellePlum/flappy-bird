import React from 'react';
import { View } from 'react-native';
import trump from '../images/trump.png'

const FlappyObject = ({flappyObjectBottom, flappyObjectLeft}) => {
const flappyObjectWidth = 65
const flappyObjectHeight = 85

return (
<View
  style={{ 
  position: 'absolute',
  backgroundImage: "url(" + trump + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: flappyObjectWidth,
  height: flappyObjectHeight,
  left: flappyObjectLeft - (flappyObjectWidth/2),
  bottom: flappyObjectBottom - (flappyObjectHeight/2),
  }}> </View>
)}
export default FlappyObject