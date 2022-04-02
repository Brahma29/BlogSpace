import React, { useState, useEffect } from 'react';
import './CSS/Editor.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost, listPostsById } from '../actions/postActions';
import { loginUser } from '../actions/userActions';
import { useParams, useNavigate } from 'react-router-dom';

const Editor = () => {
  const [postLoading, setPostLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const [articleDetails, setArticleDetails] = useState({
    title: '',
    description: '',
    author: '',
  });
  const [image, setImage] = useState(null);
  const pid = params.id;
  const dispatch = useDispatch();

  const createDPost = useSelector((state) => state.createNewPost);
  const {
    loading: loadingNewPost,
    error: errorNewPost,
    posts: newPost,
  } = createDPost;

  const postById = useSelector((state) => state.postsById);
  const {
    loading: loadingPostById,
    error: errorPostById,
    post: postsById,
  } = postById;

  const userLoginDetails = useSelector((state) => state.userLogin);
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    user: userInfo,
  } = userLoginDetails;

  const PostUpdate = useSelector((state) => state.updateUserPost);
  const {
    loading: loadingUpdatePost,
    error: errorUpdatePost,
    posts: UpdatePost,
  } = PostUpdate;

  const handleChange = (e) => {
    setArticleDetails({ ...articleDetails, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const formdata = new FormData();
    formdata.append('title', articleDetails.title);
    formdata.append('description', articleDetails.description);
    formdata.append('username', userInfo.username);
    formdata.append('file', image);

    // dispatch(createPost(formdata));
    if (pid) {
      if (articleDetails.title !== '' && articleDetails.description !== '') {
        dispatch(updatePost(formdata, pid));

        navigate('/');
      } else {
        alert('Please Add Mandatory Fields');
      }
    } else {
      if (articleDetails.title !== '' && articleDetails.description !== '') {
        dispatch(createPost(formdata));

        navigate('/');
      } else {
        alert('Please Add Mandatory Fields');
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      if (pid) {
        dispatch(listPostsById(pid));
        setTimeout(() => {
          if (postById) {
            setImage({ image: postsById.photo.substring(9) });
            setArticleDetails({ title: postsById.title });
            setArticleDetails({ description: postsById.description });
          }
        }, 1000);
      } else {
        setArticleDetails({ title: '' });
        setArticleDetails({ description: '' });
      }
    } else {
      navigate('/login');
    }
  }, []);
  return (
    <>
      {!loadingPostById ? (
        <div className='editor-wrapper'>
          <div className='banner'>
            <input
              type='file'
              accept='image/*'
              name='image'
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              id='banner-upload'
              hidden
            />
            <label htmlFor='banner-upload' className='banner-upload-btn'>
              <i class='fas fa-upload fa-3x'></i>
            </label>
          </div>
          <div className='blog'>
            <textarea
              className='title'
              name='title'
              value={articleDetails.title}
              onChange={handleChange}
              placeholder='Blog title...'
            ></textarea>
            <textarea
              className='write-article'
              onChange={handleChange}
              name='description'
              value={articleDetails.description}
              placeholder='Start writing .....'
            ></textarea>
          </div>
          <div className='blog-options'>
            <button
              class='publish-btn btn'
              onClick={handleClick}
              className='btn btn-primary'
            >
              Publish
            </button>
            <input type='file' accept='image/*' id='image-upload' hidden />
            <label htmlFor='image-upload' className='image-upload-btn btn'>
              Upload Image
            </label>
          </div>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </>
  );
};

export default Editor;
