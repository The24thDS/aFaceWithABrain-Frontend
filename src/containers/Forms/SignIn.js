import React from 'react';
import Input from './Input';
import styles from './Form.module.css'

class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
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

    onSubmit = async(event) => {
        event.preventDefault()
        const { email, password } = this.state
        if(!email.length || !password.length)
            return false;
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        try {
            const response = await fetch('http://localhost:3030/signin', request)
            const info = await response.json()
            if(info.status === "Success")
                this.props.updateGlobalState({
                    signedIn: true,
                    path: '/image',
                    email: this.state.email,
                    username: info.response.username
                })
        } catch(err) {console.log(err)}
    }

    render(){
        const email = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/)
        const password = new RegExp(/^(?=.*\d)(?=.*[.,<>?'"[\]{}`~!@#$%^&*()\-+_/\\])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,35}$$/) // eg: testPassword.1
        return(
            <form className={`${styles.form} ${styles.login}`}>
                <Input 
                    onBlur={event=>this.validate(event, email)} 
                    onClick={this.onClick}
                    name="email" type="email" text="Email" required="true" 
                />
                <Input 
                    onBlur={event=>this.validate(event, password)} 
                    onClick={this.onClick}
                    name="password" type="password" text="Password" required="true" 
                />
                <Input 
                    onClick={this.onSubmit} 
                    name="submit" type="submit" text="Log In"
                />
            </form>
        )
    }
}

export default SignIn;