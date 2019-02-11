import React from 'react';
import Input from './Input';
import styles from './Form.module.css'

class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    addInfo = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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

    onSubmit = (event) => {
        event.preventDefault()
        if(!this.validEmail(this.state.email) || !this.validPassword(this.state.password))
            return false;
        fetch('http://localhost:3030/signin', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === "Success")
                this.props.changePath(true)
        })
        .catch(err => console.log("Error: AI is taking over the world 🤖"))
    }

    render(){
        return(
            <form className={`${styles.form} ${styles.login}`}>
                <Input onBlur={this.verify} name="email" type="email" text="Email" required="true" />
                <Input onBlur={this.verify} name="password" type="password" text="Password" required="true" />
                <Input onClick={this.onSubmit} name="submit" type="submit" text="Log In"/>
            </form>
        )
    }
}

export default SignIn;