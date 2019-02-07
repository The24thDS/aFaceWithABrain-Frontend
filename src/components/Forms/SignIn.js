import React from 'react';
import Input from './Input';
import styles from './Form.module.css'

const SignIn = ({onSignIn}) => {
    return(
        <form className={styles.form}>
            <Input name="email" type="email" text="Email" required="true" />
            <Input name="password" type="password" text="Password" required="true" />
            <Input name="submit" type="submit" text="Log In" submitInput={onSignIn} />
        </form>
    )
}

export default SignIn;