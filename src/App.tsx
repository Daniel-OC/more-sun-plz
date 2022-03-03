import React from 'react';
import './App.scss';
import {getSunriseAndSunset} from './apiCall'
import Form from './Components/Form/Form'

interface State {
  wakeUp: string
  endWork: string
  startWork: string
  goSleep:string
  day: Day
  totalSleep: number
}

interface Day {
  sunrise: string
  sunset: string
  date: Date 
  day: string
}

interface FetchResponse {
astronomical_twilight_begin: string
astronomical_twilight_end: string
civil_twilight_begin: string
civil_twilight_end: string
day_length: number
nautical_twilight_begin: string
nautical_twilight_end: string
solar_noon: string
sunrise: string
sunset: string

}

class App extends React.Component{
  state: State = {
    wakeUp: "",
    endWork: "",
    startWork: "",
    goSleep: "",
    day: {
      sunrise: "",
      sunset: "",
      date: new Date(Date.now()),
      day: ""
    },
    totalSleep: 0
  }


  calculateSuntime = () => {
    const oneMinute = 60000
    const minutesOfSun = (new Date(this.state.day.sunset).getTime()) - (new Date(this.state.day.sunrise).getTime())
    console.log(minutesOfSun / oneMinute / 60)
  }

  grabTime = (type: string, time: string) => {
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

  initiateFetch = () => {
    getSunriseAndSunset()
    .then((data: FetchResponse) => {
      console.log(data)
      this.setState({day: {
        ...this.state.day,
        sunrise: new Date(data.sunrise),
        sunset: new Date(data.sunset),
        day: this.state.day.date.getDay()
      }})
    })
    .then(this.calculateSuntime())
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.initiateFetch}>
          Get Sunrise and Sunset!
        </button>
        <Form grabTime={this.grabTime}/>
      </div>
    );
  }
}

export default App;
