import React from 'react'

interface Props {
  title: string,
  class: string,
  grabTime: (input: string, time: string) => void
}

const TimeInput: React.FC<Props> = (props: Props) => {

  return (
    <section className={`${props.class}-container`}>
       <h3 className={props.class}>{props.title}</h3>
       <input type='time' id={`${props.class}-id`} name={`${props.class}-name`} onChange={event => props.grabTime(event.target.name, event.target.value)}></input>
     </section>
  )
}

export default TimeInput;