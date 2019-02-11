import React, { Component } from 'react'
import Header from '../components/Header/Header'
import Image from '../containers/Image/Image'
import Background from '../components/Background/Background'
import SignIn from './Forms/SignIn'
import Register from './Forms/Register'
import './App.css'

class App extends Component {
  constructor(){
    super();
    this.state = {
      signedIn: false,
      path: '/signin',
      email: ''
    }
  }

  changePage = (path) => {
    if(path==='/signin')
      this.setState({
        signedIn: false,
        path
      })
    else if(path===true)
      this.setState({
        signedIn: true,
        path: '/image'
      })
    else
      this.setState({path})
  }

  

  render() {
    const {signedIn, path} = this.state
    return (
      <div className="App">
        <Header signedIn={signedIn} path={path} changePage={this.changePage}/>
        <section>
          {
            signedIn?
                <Image />
              : path==='/signin'?
                  <SignIn changePath={this.changePage}/>
                :
                  <Register/>
          }
        </section>
        <Background/>
      </div>
    )
  }
}

export default App
