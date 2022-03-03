import React from 'react';
import './App.scss';
import {getSunriseAndSunset} from './apiCall'
import Form from './Components/Form/Form'

interface State {
  wakeUp: string
  endWork: string
  startWork: string
  goSleep:string
}

class App extends React.Component{
  state: State = {
    wakeUp: "",
    endWork: "",
    startWork: "",
    goSleep: ""
  }


  grabValue = (type: string, time: string) => {
    switch (type) {
      case "go-sleep-name":
        this.setState({goSleep: time})
        break;
    
      case "wake-up-name":
        this.setState({wakeUp: time})
        break;

      case "start-work-name":
        this.setState({startWork: time})
        break;

        case "end-work-name":
          this.setState({endWork: time})
    }
  }

  render() {
    return (
      <div className="App">
        <button onClick={getSunriseAndSunset}>
          Get Sunrise and Sunset!
        </button>
        <Form grabValue={this.grabValue}/>
      </div>
    );
  }
}

export default App;
