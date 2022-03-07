import TimeInput from '../TimeInput/TimeInput'
import { Link } from 'react-router-dom'

interface Props {
  grabTime: (type: string, time: string) => void
  wakeUp: string
  endWork: string
  startWork: string
  goSleep:string
  initiateFetch: () => void
  changeView: (change: string) => void
  currentView: string
}

const Form: React.FC<Props> = (props: Props) => {
  
  const goSleep = () => {
    return <TimeInput
    title='What time do you go to bed?'
    class='go-sleep'
    grabTime={props.grabTime}
    />
  }
  
  const wakeUp = () => {
    return <TimeInput 
    title='What time do you wake up?'
    class='wake-up'
    grabTime={props.grabTime}
    />
  }

  const startWork = () => {
    return <TimeInput 
    title='What time do you start work?'
    class='start-work'
    grabTime={props.grabTime}
    />
  }

  const endWork = () => {
    return <TimeInput
    title='What time does work end?'
    class='end-work'
    grabTime={props.grabTime}
    />
  }

  return(
    <section className='input-form'>
      <h2>How Does Daylight Savings Affect Me?</h2>
      {goSleep()}
      {wakeUp()}
      {startWork()}
      {endWork()}
      {props.endWork && props.goSleep && props.startWork && props.wakeUp && <Link to='standard'>
          <button className='submit-hours'
          onClick={() => {
            props.initiateFetch()
            props.changeView('standard')}} >
            Submit
          </button>
        </Link>}
    </section>
  ) 
}

export default Form;