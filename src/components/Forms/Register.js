import React from 'react';
import Input from './Input';
import styles from './Form.module.css'

const Register = () => {
    return(
        <form className={styles.form}>
            <Input name="username" type="text" text="Username" required="true" />
            <Input name="email" type="email" text="Email" required="true" />
            <Input name="password" type="password" text="Password" required="true" />
            <Input name="submit" type="submit" text="Sign Up" />
        </form>
    )
}

export default Register;