import TimeInput from "../TimeInput/TimeInput"

interface Props {
  grabTime: (type: string, time: string) => void
}

const Form = (props: Props) => {
  
  const goSleep = () => {
    return <TimeInput
    title="What time do you go to bed?"
    class="go-sleep"
    grabTime={props.grabTime}
    />
  }
  
  const wakeUp = () => {
    return <TimeInput 
    title="What time do you wake up?"
    class="wake-up"
    grabTime={props.grabTime}
    />
  }

  const startWork = () => {
    return <TimeInput 
    title="What time do you start work?"
    class="start-work"
    grabTime={props.grabTime}
    />
  }

  const endWork = () => {
    return <TimeInput
    title="What time does work end?"
    class="end-work"
    grabTime={props.grabTime}
    />
  }

  return(
    <section className="input-form">
      {goSleep()}
      {wakeUp()}
      {startWork()}
      {endWork()}
    </section>

  ) 
}

export default Form;