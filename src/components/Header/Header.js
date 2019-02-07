import React from 'react';
import Logo from './Logo';
import styles from './Header.module.css';

const Header = ({signedIn, path, changePage}) =>{
    return(
        <header className={styles.header}>
            <Logo height="60px"/>
            {
                signedIn?<p onClick={()=>{changePage('/signin')}}>{'Sign out'}</p>:path==='/signin'?<p onClick={()=>{changePage('/register')}}>{'Register'}</p>:<p onClick={()=>{changePage('/signin')}}>{'Login'}</p>
            }
        </header>
    );
}
export default Header;