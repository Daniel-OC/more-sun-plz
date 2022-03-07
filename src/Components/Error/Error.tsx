import {Link} from 'react-router-dom'

interface Props {
  error: string
}

const Error = (props: Props) => {
  return (
    <section className='error-container'>
      <p className='error-message'>{props.error}</p>
      {!props.error.includes('5') && <Link to='/'>Take Me Back Home!</Link>}
    </section>
  )
}

export default Error;