import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation  from './components/Navigation/Navigation';
import Register  from './components/Register/Register';
import Signin  from './components/SignIn/Signin';
import FaceRecognition  from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'b48458ad083f47bc964814aa0c5686fd'
});

const particlesOption = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
          }
        }
    }
  }


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      route: 'signin',
      isSignedIn: false
    }
  }

  onInputChange = (event) =>  {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      alert(err);
    }
  );
  }

  onRouteChange = (route)=> {
      if(route === 'signout') {
        this.setState({isSignedIn: false});
      } else if(route === 'home') {
        this.setState({isSignedIn: true});
      }
      this.setState({route: route});
  }

  render() {
    const { isSignedIn, route, imageUrl  } = this.state;
    return (
      <div className="App">
      <Particles className='particles'
             params={particlesOption}
           />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          { route === 'home'
              ? <div>
              <Logo/>
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                />
              <FaceRecognition imageUrl={imageUrl}/>
          </div>
          :(
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
