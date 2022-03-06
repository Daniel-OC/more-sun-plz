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

const StandardTimeBox = (props: Props) => {
  const yesStandard = 
    <section>
      <h2>It is currently Standard Time. It is currently {props.dstDay.currentTime}.</h2>
      <p>The sun rose at {props.dstDay.sunrise} and set at {props.dstDay.sunset}</p>
      <p>You got{props.dstDay.totalSun} hours of sunlight today.</p>
    </section> 

  const notStandard = 
    <section>
      <h2>It is currently Daylight Savings Time. If we made it Standard Time year-round it would currently be {props.standardDay.currentTime}.</h2>
      <p>The sun would have risen at{props.standardDay.sunrise} and set at {props.standardDay.sunset}</p>
      <p>You would have gotten {props.standardDay.totalSun} hours of sunlight today.</p>
    </section>
  
  return (
    <section className="DST-box">
      {props.currentTimeDesignation === "DST" && yesDST}
      {props.currentTimeDesignation === "Standard" && notDST}
    </section>
  )
}

export default StandardTimeBox;