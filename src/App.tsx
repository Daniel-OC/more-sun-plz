import React from 'react';
import './App.scss';
import {getSunriseAndSunset} from './apiCall'
import Form from './Components/Form/Form'
import DSTBox from './Components/DSTBox/DSTBox'
import StandardTimeBox from './Components/StandardTimeBox/StandardTimeBox'
import { Route, Switch } from 'react-router-dom'
import Error from './Components/Error/Error'
import LocationForm from './Components/LocationForm/LocationForm';

interface Props {}

interface State {
  wakeUp: string
  endWork: string
  startWork: string
  goSleep:string
  standardDay: Day
  dstDay: Day
  currentTimeDesignation: string
  currentView: string
  error: string
}

interface Day {
  sunrise: string
  sunset: string
  date: Date 
  day: number
  totalSun: number
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

interface TimeObject{
  sunriseTime: number,
  sunsetTime: number,
  wakeUpTime: number,
  startWorkTime: number,
  endWorkTime: number,
  goSleepTime: number
}

class App extends React.Component<Props, State> {
  state: State = {
    wakeUp: '',
    endWork: '',
    startWork: '',
    goSleep: '',
    standardDay: {
      sunrise: '',
      sunset: '',
      date: new Date(Date.now()),
      day: 4,
      totalSun: 0
    },
    dstDay: {
      sunrise: '',
      sunset: '',
      date: new Date(Date.now()),
      day: 4,
      totalSun: 0
    },
    currentTimeDesignation: '',
    currentView: '',
    error: ''
  }

  grabTime = (type: string, time: string) => {
    switch (type) {
      case 'go-sleep-name':
        this.setState({goSleep: time})
        break;
    
      case 'wake-up-name':
        this.setState({wakeUp: time})
        break;

      case 'start-work-name':
        this.setState({startWork: time})
        break;

        case 'end-work-name':
          this.setState({endWork: time})
    }
  }

  checkIfDST = (date: Date): void => {
    if (((date.getMonth() === 2) && date.getDate() >= 12) ||  ((date.getMonth() === 10) && date.getDate() <= 5) || ((date.getMonth() > 2) && (date.getMonth() < 10))) {
      this.setState({ currentTimeDesignation: 'DST' })
    }
    else {
      this.setState({currentTimeDesignation: 'Standard'})
    }
  }

  changeView = (change: string) => {
    this.setState({currentView: change})
  }

  determineWdOrWe = () => {
    this.checkIfDST(this.state.standardDay.date)
    if (this.state.standardDay.day === 0 || this.state.standardDay.day === 6) {
      this.calculateSuntimeWeekend(this.state.standardDay)
      this.calculateSuntimeWeekend(this.state.dstDay)
    } else {
      this.calculateSuntimeWeekday(this.state.standardDay)
      this.calculateSuntimeWeekday(this.state.dstDay)
    }
  }

  createTimeObjects = (dayToCalculate: Day): TimeObject => {
    let sunrise: Date = new Date (dayToCalculate.sunrise)
    let sunset: Date = new Date (dayToCalculate.sunset)
    sunrise.setHours(sunrise.getHours()-1)
    sunset.setHours(sunset.getHours()-1)
    const year: number = sunrise.getFullYear()
    const month: number = sunrise.getMonth()
    const day: number = sunrise.getDate()
    const sunriseTime: number = sunrise.getTime()
    const sunsetTime: number = sunset.getTime()
    const wakeUpTime = new Date(year, month, day, parseInt(this.state.wakeUp.slice(0,2)), parseInt(this.state.wakeUp.slice(3,5))).getTime()
    const startWorkTime = new Date(year, month, day, parseInt(this.state.startWork.slice(0,2)), parseInt(this.state.startWork.slice(3,5))).getTime()
    const endWorkTime = new Date(year, month, parseInt(this.state.endWork.slice(0,2)) > 12 ? day: day +1, parseInt(this.state.endWork.slice(0,2)), parseInt(this.state.endWork.slice(3,5))).getTime()
    const goSleepTime = new Date(year, month, parseInt(this.state.goSleep.slice(0,2)) > 12 ? day: day +1, parseInt(this.state.goSleep.slice(0,2)), parseInt(this.state.goSleep.slice(3,5))).getTime()
    let timeObjects = {
      sunriseTime: sunriseTime,
      sunsetTime: sunsetTime,
      wakeUpTime: wakeUpTime,
      startWorkTime: startWorkTime,
      endWorkTime: endWorkTime,
      goSleepTime: goSleepTime
    }
    
    return timeObjects
  }

  calculateSuntimeWeekend = (dayToCalculate: Day): void =>  {
    const allTimes = this.createTimeObjects(dayToCalculate)
    const oneMinute: number = 60000
    let minutesOfSun = 0;
    
    if (allTimes.wakeUpTime > allTimes.sunriseTime && allTimes.goSleepTime > allTimes.sunsetTime) {
      minutesOfSun += ((allTimes.sunsetTime - allTimes.wakeUpTime) / oneMinute)
    } else if (allTimes.wakeUpTime < allTimes.sunriseTime && allTimes.goSleepTime > allTimes.sunsetTime) {
      minutesOfSun += ((allTimes.sunsetTime - allTimes.wakeUpTime) / oneMinute)
    } else if (allTimes.wakeUpTime > allTimes.sunriseTime && allTimes.goSleepTime < allTimes.sunsetTime) {
      minutesOfSun += ((allTimes.goSleepTime - allTimes.wakeUpTime) / oneMinute)
    } else if (allTimes.wakeUpTime < allTimes.sunriseTime && allTimes.goSleepTime < allTimes.sunsetTime) {
      minutesOfSun += ((allTimes.goSleepTime - allTimes.sunriseTime) / oneMinute)
    }
    
    if (dayToCalculate === this.state.standardDay) {
      this.setState({standardDay: {
        ...this.state.standardDay,
        totalSun: minutesOfSun
      }})
    } else {
      this.setState({dstDay: {
        ...this.state.dstDay,
        totalSun: minutesOfSun
      }})
    }
  }

  calculateSuntimeWeekday = (dayToCalculate: Day): void => {
    const allTimes = this.createTimeObjects(dayToCalculate)
    const oneMinute: number = 60000
    let minutesOfSun = 0;
    
    if (allTimes.sunriseTime < allTimes.wakeUpTime) {
      minutesOfSun += ((allTimes.startWorkTime - allTimes.wakeUpTime) / oneMinute)
    } else if ( allTimes.sunriseTime < allTimes.startWorkTime) {
      minutesOfSun += ((allTimes.startWorkTime - allTimes.sunriseTime)/ oneMinute)
    }
    if (allTimes.goSleepTime < allTimes.sunsetTime) {
      minutesOfSun += ((allTimes.goSleepTime - allTimes.endWorkTime) / oneMinute)
    }
    else if (((allTimes.endWorkTime < allTimes.sunsetTime) && (allTimes.sunsetTime < allTimes.goSleepTime))) {
      minutesOfSun += ((allTimes.sunsetTime - allTimes.endWorkTime) / oneMinute)
    }
    if (dayToCalculate === this.state.standardDay) {
      this.setState({standardDay: {
        ...this.state.standardDay,
        totalSun: minutesOfSun
      }})
    } else {
      this.setState({dstDay: {
        ...this.state.dstDay,
        totalSun: minutesOfSun
      }})
    }
  }

  initiateFetch = () => {
    const dateForFetch = this.state.standardDay.date.toISOString().split('T')[0]
    getSunriseAndSunset(dateForFetch)
    .then((data: FetchResponse) => {
      this.setStateWithFetch(data)
    })
    .catch(error => this.setState({error: error}))
  }

  setStateWithFetch = (data: FetchResponse) => {
    let dstSunrise = new Date(data.sunrise)
    let dstSunset = new Date(data.sunset)
    let dstTime = new Date(Date.now())
    let standardTime = new Date(Date.now())
    dstTime.setHours(dstTime.getHours() +1)
    dstSunrise.setHours(dstSunrise.getHours() + 1)
    dstSunset.setHours(dstSunset.getHours() + 1)
      this.setState({standardDay: {
        ...this.state.standardDay,
        date: standardTime,
        sunrise: data.sunrise,
        sunset: data.sunset,
        day: this.state.standardDay.date.getDay()
      },
      dstDay: {
        ...this.state.dstDay,
        date: dstTime,
        sunrise: dstSunrise.toISOString(),
        sunset: dstSunset.toISOString(),
        day: this.state.dstDay.date.getDay()
      }}, () => {this.determineWdOrWe()})
  }

  render() {
    const showError = (this.state.error && <Error error={this.state.error}/>)
    return (
      <div className='App'>
        <div className='left-box'>
          <h1>How Much More Sunlight Would You Get w/o Daylight Savings?</h1>
        </div>
        <div className='right-box'>
          {showError}
          <Switch>
            <Route exact path='/' render={() => <LocationForm></LocationForm>}></Route>
            {/* <Route exact path='/' render={() => <Form currentView={this.state.currentView} changeView={this.changeView} grabTime={this.grabTime} goSleep={this.state.goSleep} startWork={this.state.startWork} endWork={this.state.endWork} wakeUp={this.state.wakeUp} initiateFetch={this.initiateFetch} />} /> */}
            <Route path='/dst' render={() => <DSTBox currentView={this.state.currentView} changeView={this.changeView} dstDay={this.state.dstDay} standardDay={this.state.standardDay} currentTimeDesignation={this.state.currentTimeDesignation} />}/>
            <Route path='/standard' render={() => <StandardTimeBox currentView={this.state.currentView} changeView={this.changeView} dstDay={this.state.dstDay} standardDay={this.state.standardDay} currentTimeDesignation={this.state.currentTimeDesignation} />}/>
            <Route path='/*' render={() => <Error error="Sorry this page doesn't seem to exist!"/>}/>
          </Switch>
        </div>
      </div>
    );
  };
};

export default App;
