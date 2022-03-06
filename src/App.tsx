import React from 'react';
import './App.scss';
import {getSunriseAndSunset} from './apiCall'
import Form from './Components/Form/Form'

interface Props {}

interface State {
  wakeUp: string
  endWork: string
  startWork: string
  goSleep:string
  totalSun: any
  standardDay: Day
  dstDay: Day
  currentTimeDesignation: string
  currentView: string
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

class App extends React.Component<Props, State> {
  state: State = {
    wakeUp: "07:45",
    endWork: "17:45",
    startWork: "09:45",
    goSleep: "23:45",
    totalSun: 0,
    standardDay: {
      sunrise: "",
      sunset: "",
      // date: new Date(10, 4,3,3),
      date: new Date(Date.now()),
      day: 4
    },
    dstDay: {
      sunrise: "",
      sunset: "",
      date: new Date(Date.now()),
      day: 4
    },
    currentTimeDesignation: "",
    currentView: ""
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

  checkIfDST = (date: Date): void => {
    if (((date.getMonth() === 2) && date.getDate() >= 12) ||  ((date.getMonth() === 10) && date.getDate() <= 5) || ((date.getMonth() > 2) && (date.getMonth() < 10))) {
      this.setState({ currentTimeDesignation: "DST" })
    }
    else {
      this.setState({currentTimeDesignation: "Standard"})
    }
  }


  determineWdOrWe = () => {
    this.checkIfDST(this.state.day.date)
    if (this.state.day.day === 6 || this.state.day.day === 7) {
      this.calculateSuntimeWeekend()
    } else {
      this.calculateSuntimeWeekday()
    }
  }

  calculateSuntimeWeekend = (): void =>  {
    const oneMinute: number = 60000
    let sunrise: Date = new Date (this.state.day.sunrise)
    let sunset: Date = new Date (this.state.day.sunset)
    //Why are these next two lines necessary? Something about Javascript being a 0 indexed language? Very confused by sunset's tendency to increase it's hour by one.
    sunrise.setHours(sunrise.getHours()-1)
    sunset.setHours(sunset.getHours()-1)
    const sunriseTime: number = sunrise.getTime()
    const sunsetTime: number = sunset.getTime()
    const year: number = sunrise.getFullYear()
    const month: number = sunrise.getMonth()
    const day: number = sunrise.getDate()
    let minutesOfSun = 0;
    console.log(sunrise)
    console.log(sunset)
    console.log(new Date(year, month, day, parseInt(this.state.wakeUp.slice(0,2)), parseInt(this.state.wakeUp.slice(3,5))))
    console.log(new Date(year, month, day, parseInt(this.state.startWork.slice(0,2)), parseInt(this.state.startWork.slice(3,5))))
    console.log(new Date(year, month, parseInt(this.state.endWork.slice(0,2)) > 12 ? day: day +1, parseInt(this.state.endWork.slice(0,2)), parseInt(this.state.endWork.slice(3,5))))
    console.log(new Date(year, month, parseInt(this.state.goSleep.slice(0,2)) > 12 ? day: day +1, parseInt(this.state.goSleep.slice(0,2)), parseInt(this.state.goSleep.slice(3,5))))
    const wakeUpTime = new Date(year, month, day, parseInt(this.state.wakeUp.slice(0,2)), parseInt(this.state.wakeUp.slice(3,5))).getTime()
    const startWorkTime = new Date(year, month, day, parseInt(this.state.startWork.slice(0,2)), parseInt(this.state.startWork.slice(3,5))).getTime()
    const endWorkTime = new Date(year, month, parseInt(this.state.endWork.slice(0,2)) > 12 ? day: day +1, parseInt(this.state.endWork.slice(0,2)), parseInt(this.state.endWork.slice(3,5))).getTime()
    const goSleepTime = new Date(year, month, parseInt(this.state.goSleep.slice(0,2)) > 12 ? day: day +1, parseInt(this.state.goSleep.slice(0,2)), parseInt(this.state.goSleep.slice(3,5))).getTime()
    // Logic of weekend:
    // looking for all the time that they are awake and it's sunny.
    // If wakeup is <
    if (wakeUpTime > sunriseTime && goSleepTime > sunsetTime) {
      minutesOfSun += ((sunsetTime - wakeUpTime) / oneMinute)
    } else if (wakeUpTime < sunriseTime && goSleepTime > sunsetTime) {
      minutesOfSun += ((sunsetTime - wakeUpTime) / oneMinute)
    } else if (wakeUpTime > sunriseTime && goSleepTime < sunsetTime) {
      minutesOfSun += ((goSleepTime - wakeUpTime) / oneMinute)
    } else if (wakeUpTime < sunriseTime && goSleepTime < sunsetTime) {
      minutesOfSun +=((goSleepTime - sunriseTime) / oneMinute)
    }
    
    ///FUNCTION BELOW WORKS, WHY IS TYPESCRIPT MAD?
    this.setState({totalSun: minutesOfSun})
  }

  calculateSuntimeWeekday = (dayToCalculate: Day): void => {
    const oneMinute: number = 60000
    console.log(dayToCalculate.sunrise)
    let sunrise: Date = new Date (dayToCalculate.sunrise)
    let sunset: Date = new Date (dayToCalculate.sunset)
    //Why are these next two lines necessary? Something about Javascript being a 0 indexed language? Very confused by sunset's tendency to increase it's hour by one.
    sunrise.setHours(sunrise.getHours()-1)
    sunset.setHours(sunset.getHours()-1)
    const sunriseTime: number = sunrise.getTime()
    const sunsetTime: number = sunset.getTime()
    const year: number = sunrise.getFullYear()
    const month: number = sunrise.getMonth()
    const day: number = sunrise.getDate()
    let minutesOfSun = 0;
    console.log(sunrise)
    console.log(sunset)
    console.log(new Date(year, month, day, parseInt(this.state.wakeUp.slice(0,2)), parseInt(this.state.wakeUp.slice(3,5))))
    console.log(new Date(year, month, day, parseInt(this.state.startWork.slice(0,2)), parseInt(this.state.startWork.slice(3,5))))
    console.log(new Date(year, month, parseInt(this.state.endWork.slice(0,2)) > 12 ? day: day +1, parseInt(this.state.endWork.slice(0,2)), parseInt(this.state.endWork.slice(3,5))))
    console.log(new Date(year, month, parseInt(this.state.goSleep.slice(0,2)) > 12 ? day: day +1, parseInt(this.state.goSleep.slice(0,2)), parseInt(this.state.goSleep.slice(3,5))))
    const wakeUpTime = new Date(year, month, day, parseInt(this.state.wakeUp.slice(0,2)), parseInt(this.state.wakeUp.slice(3,5))).getTime()
    const startWorkTime = new Date(year, month, day, parseInt(this.state.startWork.slice(0,2)), parseInt(this.state.startWork.slice(3,5))).getTime()
    const endWorkTime = new Date(year, month, parseInt(this.state.endWork.slice(0,2)) > 12 ? day: day +1, parseInt(this.state.endWork.slice(0,2)), parseInt(this.state.endWork.slice(3,5))).getTime()
    const goSleepTime = new Date(year, month, parseInt(this.state.goSleep.slice(0,2)) > 12 ? day: day +1, parseInt(this.state.goSleep.slice(0,2)), parseInt(this.state.goSleep.slice(3,5))).getTime()
    if (sunriseTime < wakeUpTime) {
      minutesOfSun += ((startWorkTime - wakeUpTime) / oneMinute)
      // console.log(((startWorkTime - wakeUpTime) / oneMinute))
    } else if ( sunriseTime < startWorkTime) {
      minutesOfSun += ((startWorkTime - sunriseTime)/ oneMinute)
      // console.log(((startWorkTime - sunriseTime)/ oneMinute))
    }
    if (goSleepTime < sunsetTime) {
      minutesOfSun += ((goSleepTime - endWorkTime) / oneMinute)
      // console.log(((goSleepTime - endWorkTime) / oneMinute))
    }
    else if (((endWorkTime < sunsetTime) && (sunsetTime < goSleepTime))) {
      minutesOfSun += ((sunsetTime - endWorkTime) / oneMinute)
      // console.log(((sunsetTime - endWorkTime) / oneMinute))
      // console.log(sunsetTime/oneMinute, endWorkTime/oneMinute)
    }
    this.setState({totalSun: minutesOfSun})
    // console.log(minutesOfSun / 60)
  }

  initiateFetch = () => {
    const dateForFetch = this.state.day.date.toISOString().split('T')[0]
    console.log(dateForFetch)
    getSunriseAndSunset(dateForFetch)
    .then((data: FetchResponse) => {
      console.log(data)
      this.setStateWithFetch(data)
    })
    // .then(() => this.determineWdOrWe())
    .catch(error => console.log(error))
  }

  setStateWithFetch = (data: FetchResponse) => {
      this.setState({standardDay: {
        ...this.state.standardDay,
        sunrise: data.sunrise,
        sunset: data.sunset,
        day: this.state.standardDay.date.getDay()
      },
      dstDay: {
        ...this.state.dstDay,
        sunrise: data.sunrise,
        sunset: data.sunset,
        day:
      }}, () => {this.determineWdOrWe()})
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

  // findSunlightForYear = () => {
  //   let today = new Date(this.state.day.date)
  //   for (let i = 0; i < 1 ; i++) {
  //     const dateForFetch = today.toISOString().split('T')[0]
  //     getSunriseAndSunset(dateForFetch)
  //     .then((data: FetchResponse) => {
  //       this.setStateWithFetch(data)
  //     })
  //     .then(() => {
  //       if (this.state.day.day === 6 || this.state.day.day === 7) {
  //         this.calculateSuntimeWeekend()
  //       } else {
  //         this.calculateSuntimeWeekday
  //       }
  //     })
  //     .then(() =>{
  //       let tomorrow = today
  //       console.log("log tomorrow",tomorrow)
  //       this.setState({day: {
  //         ...this.state.day,
  //         date: new Date()
  //       }})
  //     })
  //   }
  // }

  render() {
    return (
      <div className="App">
        <button onClick={this.initiateFetch}>
          Initiate Fetch and Calculate Time
        </button>
        {/* <button onClick={this.checkIfDST(this.state.day.date)}>
          console log for current function
        </button> */}
        <Form grabTime={this.grabTime}/>
        {this.state.totalSun !==0 && <p>You will have {(this.state.totalSun / 60).toFixed(2)} hours of sun to yourself today!</p>}
      </div>
    );
  }
}

export default App;
