import React from 'react';
import itemPlatform from '../images/danger-low.png'

const BottomLayot = () =>{
    return(
        <div
        style={{
        backgroundImage: "url(" + itemPlatform + ")",
        width: '100%',
        bottom: 0,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: 140,
        position: 'absolute',
        zIndex: 2,
   }}>
   </div>
)} 
export default BottomLayot