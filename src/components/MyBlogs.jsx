import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import { listUserPosts } from '../actions/postActions';
import './CSS/MyBlogs.css';
import MyBlog from './MyBlog';
import Spinner from './Spinner';

const MyBlogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const userLoginDetails = useSelector((state) => state.userLogin);
  const userPosts = useSelector((state) => state.userPosts);
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    user: userInfo,
  } = userLoginDetails;
  const {
    loading: loadingUserPosts,
    error: errorUserPosts,
    posts: usersPosts,
  } = userPosts;
  setTimeout(() => {
    usersPosts ? setLoading(false) : setLoading(true);
  }, 1000);
  useEffect(() => {
    dispatch(listUserPosts(userInfo.username));
    console.log(usersPosts);
  }, [dispatch]);
  return (
    <>
      {!loading ? (
        <div className='my-blogs'>
          <h2 style={{ paddingBottom: '1rem' }}>My Blogs</h2>
          {usersPosts.map((eachPost) => (
            <MyBlog
              key={eachPost.id}
              photo={eachPost.photo}
              title={eachPost.title}
              description={eachPost.description}
              username={eachPost.username}
              id={eachPost._id}
            />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MyBlogs;
