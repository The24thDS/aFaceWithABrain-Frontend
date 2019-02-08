import React from 'react';
import Input from './Input';
import styles from './Form.module.css'

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
        }
    }

    addInfo = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // validation functions (return true or false)
    validUsername = (username) => {
        const regex = new RegExp(/^[a-zA-Z0-9]{5,254}$/)
        return regex.test(username)
    }
    validEmail = (email) => {
        const regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/)
        return regex.test(email)
    }
    validPassword = (password) => {
        const regex = new RegExp(/^(?=.*\d)(?=.*[.,<>?'"[\]{}`~!@#$%^&*()\-+_/\\])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,35}$$/) // eg: testPassword.1
        return regex.test(password)
    }

    verify = (event) => {
        if(event.target.name==='username')
        {
            if(this.validUsername(event.target.value))
                {
                    this.addInfo(event)
                    event.target.classList.add(styles.valid)
                }
            else
                event.target.classList.add(styles.invalid)
            return true
        }
        if(event.target.name==='email')
        {
            if(this.validEmail(event.target.value))
                {
                    this.addInfo(event)
                    event.target.classList.add(styles.valid)
                }
            else
                event.target.classList.add(styles.invalid)
            return true
        }
        if(event.target.name==='password')
        {
            if(this.validPassword(event.target.value))
                {
                    this.addInfo(event)
                    event.target.classList.add(styles.valid)
                }
            else
                event.target.classList.add(styles.invalid)
            return true
        }
    }

    onClick = (event) => {
        event.target.classList.remove(styles.valid)
        event.target.classList.remove(styles.invalid)
        return true
    }

    onSubmit = (event) => {
        event.preventDefault()
        if(!this.validUsername(this.state.username) || !this.validEmail(this.state.email) || !this.validPassword(this.state.password))
            return false;
        fetch('http://localhost:3030/register', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log("Error: AI is taking over the world 🤖"))
    }

    render(){
        return(
            <form className={styles.form}>
                <Input 
                verifyInput={this.verify} onInputClick={this.onClick} 
                infos={["at least 5 characters"]} 
                name="username" type="text" text="Username" 
                />
                <Input 
                verifyInput={this.verify} onInputClick={this.onClick} 
                name="email" type="text" text="Email" 
                />
                <Input 
                verifyInput={this.verify} onInputClick={this.onClick} 
                infos={["at least 8 characters including","at least one lowercase, uppercase, number and symbol"]}
                name="password" type="password" text="Password" 
                />
                <Input onInputClick={this.onSubmit} name="submit" type="submit" text="Sign Up" />
            </form>
        )
    }
}

export default Register;