import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div class='nav'>
      <Link to='/'>
        <h1>Manage Project App</h1>
      </Link>
      <h2>User--TBD & Login/Logout</h2>
    </div>
  )
}

export default Header