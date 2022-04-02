import React, { useState } from 'react';
import './CSS/Login.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../actions/userActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const loggedInUser = useSelector((state) => state.userLogin);
  const { loading, error, user } = loggedInUser;
  const handleClick = () => {
    dispatch(loginUser(userDetails));
    navigate('/');
  };

  return (
    <>
      <div className='login-wrapper'>
        <div className='login-card'>
          <div className='login-form'>
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <form action='submit' className='login'>
              <div className='field'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  onChange={handleChange}
                  placeholder='Enter Email Address'
                />
              </div>
              <div className='field'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  onChange={handleChange}
                  placeholder='Enter Password'
                />
              </div>
              <div className='submit-btn'>
                <button type='button' onClick={handleClick}>
                  Login
                </button>
              </div>
              <div className='signup-btn'>
                No Account? <Link to='/signup'>Create Now</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
