import TimeInput from "../TimeInput/TimeInput"

interface Props {
  grabValue: (type: string, time: string) => void
}

const Form = (props: Props) => {
  
  const goSleep = () => {
    return <TimeInput
    title="What time do you go to bed?"
    class="go-sleep"
    grabValue={props.grabValue}
    />
  }
  
  const wakeUp = () => {
    return <TimeInput 
    title="What time do you wake up?"
    class="wake-up"
    grabValue={props.grabValue}
    />
  }

  const startWork = () => {
    return <TimeInput 
    title="What time do you start work?"
    class="start-work"
    grabValue={props.grabValue}
    />
  }

  const endWork = () => {
    return <TimeInput
    title="What time does work end?"
    class="end-work"
    grabValue={props.grabValue}
    />
  }

  return(
    <section className="input-form">
      {goSleep()}
      {wakeUp()}
      {startWork()}
      {endWork()}
      <button>Submit!</button>
    </section>

  ) 
}

export default Form;