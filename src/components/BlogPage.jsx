import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './CSS/BlogPage.css';
import { listPostsById } from '../actions/postActions';
import Spinner from './Spinner';

const BlogPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const pid = params.id;
  const postById = useSelector((state) => state.postsById);
  const {
    loading: loadingPostById,
    error: errorPostById,
    post: postsById,
  } = postById;

  setTimeout(() => {
    postsById ? setLoading(false) : setLoading(true);
  }, 1000);

  useEffect(() => {
    dispatch(listPostsById(pid));
  }, [dispatch]);
  console.log(postsById);

  return (
    <>
      {!loading ? (
        <div className='article-wrapper'>
          <div className='article'>
            <div className='art-img'>
              <img src={postsById.photo.substring(9)} />
            </div>
            <div className='title'>
              <h1>{postsById.title}</h1>
            </div>
            <div className='author-details'>
              <h4 className='author-name'>{postsById.username}</h4>
              <h4 className='date'>12 January 2021</h4>
            </div>
            <div className='article-text'>{postsById.description}</div>
          </div>
          <div className='review'>
            <div className='write-review'>
              <h3>Write a review</h3>
              <textarea type='text' name='review-box' id='review-box' />
              <div className='post-btn'>
                <button className='review-post'>Post</button>
              </div>
            </div>
            <div className='posted-reviews'>
              <h3>Posted Reviews</h3>
              <div className='user-details'>
                <div className='user-icon'>
                  <i class='fas fa-user-circle '></i>
                </div>
                <div className='user-name'>Brahmanand</div>
              </div>
              <div className='posted-review'>This article was nice.</div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
      )
    </>
  );
};

export default BlogPage;
