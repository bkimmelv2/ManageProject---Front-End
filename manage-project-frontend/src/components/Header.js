import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <div className='nav'>
      <Link to='/' className='Title'>
        <h1>Manage Project</h1>
      </Link>
      <div className='userContainer'>
        <h2>User-Name</h2>
        <h2>User-Picture</h2>
      </div>
      
    </div>
  )
}

export default Header