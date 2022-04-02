import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, LogOut } from '../actions/userActions';
import './CSS/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoginDetails = useSelector((state) => state.userLogin);
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    user: userInfo,
  } = userLoginDetails;

  const removeUser = () => {
    dispatch(LogOut());
  };

  return (
    <>
      <div className='wrapper'>
        <div className='navbar'>
          <div className='logo'>
            <h2>
              Blog<span style={{ color: 'blue' }}>Space</span>
            </h2>
          </div>

          <label htmlFor='checkbox' className='hamburger'>
            <i class='fas fa-bars fa-3x'></i>
          </label>
          <input type='checkbox' id='checkbox' className='menu-check' />
          <ul className='menu-items'>
            <li className='menu-item'>
              <Link to='/'>Home</Link>
            </li>
            <li className='menu-item'>
              <Link to='/editor'>Add Post</Link>
            </li>
            {userInfo ? (
              <li className='menu-item'>
                <Link to='/myblogs'>My Blogs</Link>
              </li>
            ) : (
              <li className='menu-item'>
                <Link to='/categories'>Categories</Link>
              </li>
            )}
            {!userInfo ? (
              <li className='menu-item'>
                <Link to='/login'>Login/SignUp</Link>
              </li>
            ) : (
              <li className='menu-item'>
                <Link onClick={removeUser} to='/'>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
