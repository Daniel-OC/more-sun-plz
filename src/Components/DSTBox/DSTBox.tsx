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
}

const DSTBox = (props: Props) => {
  const notDST = 
    <section>
      <h2>It is currently Standard Time. If we made it Daylight Savings Time year round it would currently be {props.dstDay.date.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}.</h2>
      <p>The sun would have risen at {new Date(props.dstDay.sunrise).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})} and set at {new Date(props.dstDay.sunset).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}</p>
      <p>You would have gotten {props.dstDay.totalSun.toFixed(2)} hours of sunlight today.</p>
    </section> 

  const yesDST = 
    <section>
      <h2>It is currently {props.dstDay.date.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}, Daylight Savings Time.</h2>
      <p>The sun rose at {new Date(props.dstDay.sunrise).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})} and will set at {new Date(props.dstDay.sunset).toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit'})}</p>
      <p>You got {props.dstDay.totalSun.toFixed(2)} hours of sunlight today.</p>
    </section>
  
  return (
    <section className="DST-box">
      {props.currentTimeDesignation === "DST" && yesDST}
      {props.currentTimeDesignation === "Standard" && notDST}
    </section>
  )
}

export default DSTBox;