import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Rank from '../components/Rank/Rank';
import ImageForm from '../components/ImageForm/ImageForm';
import Image from '../components/Image/Image';
import Background from '../components/Background/Background';
import SignIn from './Forms/SignIn'
import Register from './Forms/Register'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      inputValue: '',
      imageUrl: '',
      boxes: [],
      signedIn: false,
      path: '/signin'
    }
  }

  onInputChange = (event) =>{
    this.setState({inputValue: event.target.value});
  }

  calculateFaceLocations = (data) => {
    let boxes = data.regions.map(region => {
      return {
        top: region.region_info.bounding_box.top_row*100 + '%',
        left: region.region_info.bounding_box.left_col*100 + '%',
        width: (region.region_info.bounding_box.right_col - region.region_info.bounding_box.left_col)*100 + '%',
        height: (region.region_info.bounding_box.bottom_row - region.region_info.bounding_box.top_row)*100 + '%'
      }
    });
    return boxes;
  }

  displayFaces = (boxes) => {
    this.setState({
      imageUrl: this.state.inputValue,
      inputValue: '',
      boxes
    })
  }

  changePage = (path) => {
    if(path==='/signin')
      this.setState({
        signedIn: false
      },this.setState({path}))
    else
      this.setState({path})
  }

  signIn = (event) => {
    event.preventDefault()
    this.setState({
      inputValue: '',
      imageUrl: '',
      boxes: [],
      signedIn: false,
      path: '/signin'
    })
  }

  onSubmit = () =>{
    this.setState({imageUrl: '', boxes: []});
    fetch("http://localhost:3030/clarifai", {
      method: 'POST',
      body: JSON.stringify({
        image: this.state.inputValue
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then( response => {
      if(response.status===200)
        return response.json()
      else throw response.statusText
    })
    .then( data => this.displayFaces(this.calculateFaceLocations(data)) )
    .catch( err => this.setState({
      inputValue: '',
      imageUrl: err
    }));
  }

  render() {
    const {inputValue, imageUrl, boxes, signedIn, path} = this.state
    return (
      <div className="App">
        <Header signedIn={signedIn} path={path} changePage={this.changePage}/>
        {
          signedIn?
            <section>
              <Rank/>
              <ImageForm value={inputValue} onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <Image source={imageUrl} faces={boxes}/>
            </section>
            : path==='/signin'?
            <section>
              <SignIn onSignIn={this.signIn}/>
            </section>
            :
            <section>
              <Register/>
            </section>
        }
        <Background/>
        </div>
    );
  }
}

export default App;
