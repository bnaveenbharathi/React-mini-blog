
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='not-found'>
      <h2>Sorry </h2>
      <p>The Page Cannot be Found</p>
      <Link to='/'><button>Back to Home Page ...</button></Link>
    </div>
  )
}

export default NotFound
