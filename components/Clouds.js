import React from 'react';
import CloudsImg from '../images/clouds.png'


const Clouds = () =>{
    return(
        <div className="profileImg"
        style={{
        backgroundImage: "url(" + CloudsImg + ")",
        width: '100%',
        marginTop: -50,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: 250,
        position: 'absolute',
   }}>
   </div>
)} 
export default Clouds