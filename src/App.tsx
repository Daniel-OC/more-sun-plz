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
  totalSun: number
}

interface Day {
  sunrise: string
  sunset: string
  date: Date 
  day: number
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
      sunrise: "Thu Mar 31 2022 06:43:37 GMT-0800 (Pacific Standard Time)",
      sunset: "Thu Mar 31 2022 17:58:43 GMT-0800 (Pacific Standard Time)",
      date: new Date(Date.now()),
      day: 4
    },
    totalSun: 0
  }

  // calculateOneYear = () => {
  //   // for (let i = 0; i < 365; i++) {
  //     console.log(this.state.day.date.toISOString().split('T')[0])
  //     getSunriseAndSunset()
  //     .then((data: FetchResponse) => {
  //       this.setState({day: {
  //         ...this.state.day,
  //         sunrise: new Date(data.sunrise),
  //         sunset: new Date(data.sunset),
  //         day: this.state.day.date.getDay()
  //       }})
  //     })
  //     .catch(error => console.log(error))
  //   // }
  // }

  calculateSuntimeWeekend = (): void =>  {
    const oneMinute: number = 60000
    const minutesOfSun: number = (new Date(this.state.day.sunset).getTime()) - (new Date(this.state.day.sunrise).getTime())
    ///FUNCTION BELOW WORKS, WHY IS TYPESCRIPT MAD?
    this.setState(prevState => ({totalSun:  prevState.totalSun += minutesOfSun / oneMinute}))
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

  calculateSuntimeWeekday = (): void => {
    const oneMinute: number = 60000
    const sunrise: Date = new Date(this.state.day.sunrise) 
    const sunset: Date = new Date(this.state.day.sunset)
    const year: number = sunrise.getFullYear()
    const month: number = sunrise.getMonth()
    const day: number = sunrise.getDate()
    let minutesOfSun = 0;
    const wakeUpTime = new Date(year,month,day,parseInt(this.state.wakeUp.slice(0,2)),parseInt(this.state.wakeUp.slice(3,5)))
    const startWorkTime = new Date(year,month,day,parseInt(this.state.startWork.slice(0,2)),parseInt(this.state.startWork.slice(3,5)))
    const endWorkTime = new Date(year,month,day,parseInt(this.state.endWork.slice(0,2)),parseInt(this.state.endWork.slice(3,5)))
    const goSleepTime = new Date(year,month, parseInt(this.state.goSleep.slice(0,2)) > 12 ? day: day +1 , parseInt(this.state.goSleep.slice(0,2)),parseInt(this.state.goSleep.slice(3,5)))
    console.log(wakeUpTime)
    console.log(startWorkTime)
    console.log(endWorkTime)
    console.log(goSleepTime)
  }

  initiateFetch = () => {
    const dateForFetch = this.state.day.date.toISOString().split('T')[0]
    console.log(dateForFetch)
    getSunriseAndSunset(dateForFetch)
    .then((data: FetchResponse) => {
      console.log(data)
      this.setState({day: {
        ...this.state.day,
        sunrise: new Date(data.sunrise),
        sunset: new Date(data.sunset),
        day: this.state.day.date.getDay()
      }})
    })
    .then(() => this.calculateSuntimeWeekend())
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.initiateFetch}>
          How much time Do you have??
        </button>
        <button onClick={this.calculateSuntimeWeekday}>
          console log current function
        </button>
        <Form grabTime={this.grabTime}/>
        {this.state.totalSun !==0 && <p>You will have {this.state.totalSun / 60} hours of sun to yourself today!</p>}
      </div>
    );
  }
}

export default App;
