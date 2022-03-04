import React from 'react'


interface Props {
  title: string,
  class: string,
  grabTime: (input: string, time: string) => void
}

// interface State {
//   value: string
// }

const TimeInput: React.FC<Props> = (props: Props) => {

  return (
    <section className={`${props.class}-container`}>
       <h2 className={props.class}>{props.title}</h2>
       <input type="time" id={`${props.class}-id`} name={`${props.class}-name`} onChange={event => props.grabTime(event.target.name, event.target.value)}></input>
     </section>

  )
}


// class TimeInput extends React.Component<Props, State> {
//   state: State = {
//     value: ""
//   }

//   ///LONG TERM NEED TO TYPE THIS APPROPRIATELY
//   handleChange = (event: any) => {
//     setState({value: event.target.value})

//   }
 
//   render() {
//     return (
//     <section className={`${props.class}-container`}>
//       <h2 className={props.class}>{props.title}</h2>
//       <input type="time" id={`${props.class}-id`} name={`${props.class}-name`} onChange={event => handleChange(event)}></input>
//     </section>
//     )
//   }
// }

export default TimeInput;