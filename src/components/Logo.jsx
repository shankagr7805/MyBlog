import React from 'react'
import logo from '../assets/Logo.png' ;

function Logo({ width = '40px', height = '40px' }) {
  return (
    <img
      src={logo}
      alt="Logo"
      style={{width: width, height: height, objectFit: 'contain'}}
    />  
  );
}

export default Logo;
