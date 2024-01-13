import React from 'react'
import { Link, useLocation ,useNavigate} from 'react-router-dom';
import { signOut} from 'firebase/auth';
import { auth}  from '../config';

const navLinks = [
  {
    id: 1,
    name: 'Users',
    path: '/'
  },
  {
    id: 2,
    name: 'Feed',
    path: '/feed'
  },
  {
    id: 3,
    name: 'Profile',
    path: '/profile'
  }
]
const Navbar = () => {
  const location = useLocation();
  const { pathname} = location;
  const navigate = useNavigate();
  const handleLogout = async() => {
    await signOut(auth);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }
  const token = localStorage.getItem('token')
  return (
    <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between px-5 sm:px-20 py-5 items-center shadow-sm'>
       <div>
          <Link to={"/"} className='text-rose-400 text-2xl font-medium'>TweetX</Link>
       </div>
       <div className=''>
        <ul className='flex justify-between gap-12 mt-4 text-gray-300'>

          {navLinks.map((link) => (
            <li key={link.id} className='hover:text-rose-400'>
              <Link to={link.path} className={`font-medium ${pathname === link.path ? 'text-rose-400' : ''}`}>{link.name}</Link>
            </li>
          ))}
          {token &&
          <li  className='hover:text-rose-400'>
              <Link onClick={handleLogout}  className={`font-medium  hover:text-rose-400 }`}>Log Out</Link>
            </li>}
        </ul>


       </div>
    </div>
  )
}

export default Navbar