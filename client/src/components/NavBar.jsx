import { Link } from 'react-router-dom'
import './NavBar.scss'

export const NavBar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li><Link to='/books'>Books</Link></li>
        <li><Link to='/users'>Users</Link></li>
        <li><Link to='/categories'>Categories</Link></li>
      </ul>
    </nav>
  )
}
