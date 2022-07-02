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
    title='I go to bed at:'
    class='go-sleep'
    grabTime={props.grabTime}
    />
  }
  
  const wakeUp = () => {
    return <TimeInput 
    title='I wake up at:'
    class='wake-up'
    grabTime={props.grabTime}
    />
  }

  const startWork = () => {
    return <TimeInput 
    title='I start work at:'
    class='start-work'
    grabTime={props.grabTime}
    />
  }

  const endWork = () => {
    return <TimeInput
    title='I finish work at:'
    class='end-work'
    grabTime={props.grabTime}
    />
  }

  return(
    <section className='input-form'>
      <div className='time-entries-box'>
        <div className='left-form'>
          {goSleep()}
          {wakeUp()}
        </div>
        <div className='right-form'>
          {startWork()}
          {endWork()}
        </div>
      </div>
      <div>
        {props.endWork && props.goSleep && props.startWork && props.wakeUp && <Link to='standard'>
            <button className='submit-hours'
            onClick={() => {
              props.initiateFetch()
              props.changeView('standard')}} >
              Submit
            </button>
          </Link>}
      </div>
    </section>
  ) 
}

export default Form;