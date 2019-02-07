import React from 'react';
import Input from './Input';
import styles from './Form.module.css'

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, ()=>{console.log(this.state)})
    }
    onSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:3030/register', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log("AI is taking over the world"))
    }
    render(){
        return(
            <form className={styles.form}>
                <Input recordInput={this.onChange} name="username" type="text" text="Username" required="true" />
                <Input recordInput={this.onChange} name="email" type="email" text="Email" required="true" />
                <Input recordInput={this.onChange} name="password" type="password" text="Password" required="true" />
                <Input submitInput={this.onSubmit} name="submit" type="submit" text="Sign Up" />
            </form>
        )
    }
}

export default Register;