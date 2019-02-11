import React from 'react';
import Input from './Input';
import styles from './Form.module.css'

const username = new RegExp(/^[a-zA-Z0-9]{5,254}$/)
const email = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/)
const password = new RegExp(/^(?=.*\d)(?=.*[.,<>?'"[\]{}`~!@#$%^&*()\-+_/\\])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,35}$$/) // eg: testPassword.1

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

    validate= (event, regex) => {
		const data = event.target.value
        if(regex.test(data))
        {
            this.addInfo(event)
            event.target.classList.add(styles.valid)
        }
        else {
            event.target.classList.add(styles.invalid)
        }
    }

    onClick = (event) => {
        event.target.classList.remove(styles.valid)
        event.target.classList.remove(styles.invalid)
    }

    onSubmit = (event) => {
        event.preventDefault()
        if(!this.validUsername(this.state.username) || !this.validEmail(this.state.email) || !this.validPassword(this.state.password))
            return false;
        fetch('https://afacewithabrain.herokuapp.com/register', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === "Success")
                this.props.changePath("/signin")
        })
        .catch(err => console.log("Error: AI is taking over the world 🤖"))
    }

    render(){
        return(
            <form className={styles.form}>
                <Input 
                onBlur={event=>this.validate(event, username)} onClick={this.onClick} 
                status={true}
                infos={["at least 5 characters"]} 
                name="username" type="text" text="Username" 
                />
                <Input 
                onBlur={event=>this.validate(event, email)} onClick={this.onClick} 
                status={true}
                name="email" type="text" text="Email" 
                />
                <Input 
                onBlur={event=>this.validate(event, password)} onClick={this.onClick} 
                status={true}
                infos={["at least 8 characters including","at least one lowercase, uppercase, number and symbol"]}
                name="password" type="password" text="Password" 
                />
                <Input onClick={this.onSubmit} name="submit" type="submit" text="Sign Up" />
            </form>
        )
    }
}

export default Register;