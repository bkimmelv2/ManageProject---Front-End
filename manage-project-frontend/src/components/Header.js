import { Link } from 'react-router-dom'
import logo from '../Logo1.jpg'

const Header = (props) => {
  return (
    <div className='nav'>
      <Link to='/' className='Title'>
        <img className = "Logo" src ={logo} alt='Logo'/>
        <h1>Manage Project</h1>
        
      </Link>
            
    </div>
  )
}

export default Header