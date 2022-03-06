import {Link} from 'react-router-dom'

// put this in types so it's accessible multiple places?
interface Day {
  sunrise: string
  sunset: string
  date: Date 
  day: number
  totalSun: number
}


interface Props {
  dstDay: Day
  standardDay: Day
  currentTimeDesignation: string
  // changeView: (change: string) => void
}

const StandardTimeBox = (props: Props) => {
  const yesStandard = 
    <section>
      <h2>It is currently {props.standardDay.date.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}, Standard Time.</h2>
      <p>The sun rose at {new Date(props.standardDay.sunrise).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})} and will set at {new Date(props.standardDay.sunset).toLocaleTimeString('en-US', {hour:'2-digit', minute: '2-digit'})}</p>
      <p>You got {(props.standardDay.totalSun / 60).toFixed(2)} hours of sunlight today.</p>
    </section> 

  const notStandard = 
    <section>
      <h2>It is currently Daylight Savings Time. If we made it Standard Time year-round it would currently be {props.standardDay.date.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}.</h2>
      <p>The sun would have risen at{props.standardDay.sunrise} and set at {props.standardDay.sunset}</p>
      <p>You would have gotten {(props.standardDay.totalSun / 60).toFixed(2)} hours of sunlight today.</p>
    </section>
  
  return (
    <section className="DST-box">
      <Link to="/">Go Home</Link>
      {props.currentTimeDesignation === "DST" && notStandard}
      {props.currentTimeDesignation === "Standard" && yesStandard}
      <Link to="/standard"><p>Look at Standard Time</p></Link>
      <Link to="/dst"><p>Look at Daylight Savings Time</p></Link>
    </section>
  )
}

export default StandardTimeBox;