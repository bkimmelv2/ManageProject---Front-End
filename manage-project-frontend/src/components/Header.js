import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div class='nav'>
      <Link to='/'>
        <h1>Manage Project App</h1>
      </Link>
    </div>
  )
}

export default Header