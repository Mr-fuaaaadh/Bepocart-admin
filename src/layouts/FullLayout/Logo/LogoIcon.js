import React from "react";
import logoicn from "../../../assets/images/bepocart (1).png";

const LogoIcon = (props) => {
  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100px', // Ensure the container has a defined height
        width: '100px',  // Ensure the container has a defined width
        ...props.style // Allow for custom styles if provided
      }}
    >
      <img 
        alt="Logo" 
        src={logoicn} 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain' // Ensure the image scales while maintaining aspect ratio
        }} 
        {...props} 
      />
    </div>
  );
};

export default LogoIcon;
