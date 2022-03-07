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
  changeView: (change: string) => void
  currentView: string
}

const StandardTimeBox: React.FC<Props> = (props: Props) => {
  const yesStandard = 
    <section className='yes-standard'>
      <h2 className='result-header'>It is currently {props.standardDay.date.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}, Standard Time.</h2>
      <p className='result-info-1'>The sun rose at {new Date(props.standardDay.sunrise).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})} and will set at {new Date(props.standardDay.sunset).toLocaleTimeString('en-US', {hour:'2-digit', minute: '2-digit'})}</p>
      <p className='result-info-2'>You got {(props.standardDay.totalSun / 60).toFixed(2)} hours of sunlight today.</p>
    </section> 

  const notStandard = 
    <section className='not-standard'>
      <h2 className='result-header'>It is currently {props.dstDay.date.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})} Daylight Savings Time. If we made it Standard Time year-round it would currently be {props.standardDay.date.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}.</h2>
      <p className='result-info-1'>The sun would have risen at{props.standardDay.sunrise} and set at {props.standardDay.sunset}</p>
      <p className='result-info-2'>You would have gotten {(props.standardDay.totalSun / 60).toFixed(2)} hours of sunlight today.</p>
    </section>
  
  return (
    <section className="standard-box">
      <Link to="/" className='home-button'>Go Home</Link>
      {props.currentTimeDesignation === "DST" && notStandard}
      {props.currentTimeDesignation === "Standard" && yesStandard}
      {props.currentView === "dst" && <Link to="/standard" className='to-standard-button' onClick={() => props.changeView("standard")}><p>Compare to Standard Time</p></Link>}
      {props.currentView === "standard" && <Link to="/dst" className='to-dst-button' onClick={() => props.changeView("dst")}><p>Compare to Daylight Savings Time</p></Link>}
    </section>
  )
}

export default StandardTimeBox;