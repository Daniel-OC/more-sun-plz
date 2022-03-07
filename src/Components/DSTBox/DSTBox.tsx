import {Link} from 'react-router-dom'

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

const DSTBox: React.FC<Props> = (props: Props) => {
  const notDST = 
    <section className='not-dst'>
      <h2 className='result-header'>It is currently {props.standardDay.date.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})} Standard Time. If we made it Daylight Savings Time year round it would currently be {props.dstDay.date.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}.</h2>
      <p className='result-info-1'>The sun would have risen at {new Date(props.dstDay.sunrise).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})} and set at {new Date(props.dstDay.sunset).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}</p>
      <p className='result-info-2'>You would have gotten {(props.dstDay.totalSun / 60).toFixed(2)} hours of sunlight today.</p>
    </section> 

  const yesDST = 
    <section className='yes-dst'>
      <h2 className='result-header'>It is currently {props.dstDay.date.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}, Daylight Savings Time.</h2>
      <p className='result-info-1'>The sun rose at {new Date(props.dstDay.sunrise).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})} and will set at {new Date(props.dstDay.sunset).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}</p>
      <p className='result-info-2'>You got {(props.dstDay.totalSun / 60).toFixed(2)} hours of sunlight today.</p>
    </section>
  
  return (
    <section className='DST-box'>
      <Link to='/' className='home-button'>Go Home</Link>
      {props.currentTimeDesignation === 'DST' && yesDST}
      {props.currentTimeDesignation === 'Standard' && notDST}
      {props.currentView === 'dst' && <Link to='/standard' className='to-standard-button' onClick={() => props.changeView('standard')}><p>Compare to Standard Time</p></Link>}
      {props.currentView === 'standard' && <Link to='/dst' className='to-dst-button' onClick={() => props.changeView('dst')}><p>Compare to Daylight Savings Time</p></Link>}
    </section>
  )
}

export default DSTBox;