import {Link} from 'react-router-dom'

interface Props {
  error: string
}

const Error = (props: Props) => {
  return (
    <section className='error-container'>
      <p className='error-message'>{props.error}</p>
      {!props.error.includes('5') && <Link to='/' className='return-home-error-btn'>Take Me Back Home!</Link>}
    </section>
  )
}

export default Error;