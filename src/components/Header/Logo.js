import React from 'react';

const Logo = ({width, height}) =>{
    return(
            <img src="logo.svg" alt="Logo"
            width={height ? 'auto': width ? width : '100px'}
            height={width ? 'auto': height ? height : '100px'}
            style={{padding: "10px", background: 'rgb(25, 114, 216)', borderRadius: '10px'}}/>
    );
}
export default Logo;