import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserPost, updatePost } from '../actions/postActions';

const MyBlog = ({ photo, title, description, username, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoginDetails = useSelector((state) => state.userLogin);
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    user: userInfo,
  } = userLoginDetails;

  return (
    <>
      <div className='my-post'>
        <div className='post-img'>
          <img src={photo.substring(10)} alt='' />
        </div>
        <div className='post-text'>
          <h3>{title}</h3>
          <p>{description.substring(0, 200)}</p>
          <div className='post-options'>
            <div className='icons'>
              <i
                onClick={(e) => navigate(`/editor/${id}`)}
                class='fas fa-edit'
              ></i>
              <i
                onClick={(e) => {
                  dispatch(deleteUserPost(id, username));
                }}
                class='fas fa-trash'
              ></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBlog;
