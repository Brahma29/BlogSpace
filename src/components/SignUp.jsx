import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const newUser = useSelector((state) => state.createdUser);
  const { loading, error, user } = newUser;

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    dispatch(createNewUser(userCredentials));
    navigate('/');
  };

  return (
    <div className='login-wrapper'>
      <div className='login-card'>
        <div className='login-form'>
          <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
          <form action='submit' className='login'>
            <div className='field'>
              <input
                type='text'
                name='username'
                id='username'
                onChange={handleChange}
                placeholder='Enter UserName'
              />
            </div>
            <div className='field'>
              <input
                type='text'
                name='name'
                id='name'
                onChange={handleChange}
                placeholder='Name'
              />
            </div>
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
                placeholder='Password'
              />
            </div>
            <div className='submit-btn'>
              <button onClick={handleClick} type='submit'>
                Create Account
              </button>
            </div>
            <div className='signup-btn'>
              Have Account? <Link to='/login'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
