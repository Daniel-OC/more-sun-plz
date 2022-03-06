// import Result from '../Result/Result'

import { isPropertySignature } from "typescript"

const DSTBox = (props) => {
  const notDST = 
    <section>
      <h2>It is currently Standard Time. If we made Daylight Savings Time year round it would currently be {props.dstDay.currentTime}.</h2>
      <p>The sun would have risen at {props.dstDay.sunrise} and set at {props.dstDay.sunset}</p>
      <p>You would have gotten {props.dstDay.totalSun} hours of sunlight today.</p>
    </section> 

  const yesDST = 
    <section>
      <h2>It is currently Daylight Savings Time. It is currently {props.standardDay.currentTime}.</h2>
      <p>The sun rose at {props.standardDay.sunrise} and will set at {props.standardDay.sunset}</p>
      <p>You got {props.standardDay.totalSun} hours of sunlight today.</p>
    </section>
  
}