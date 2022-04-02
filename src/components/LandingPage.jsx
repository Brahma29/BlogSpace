import React, { useEffect, useState } from 'react';
import writeBlog from '../images/writeBlog.svg';
import './CSS/LandingPage.css';
import createProfile from '../images/createProfile.svg';
import writeFirstBlog from '../images/writeFirstBlog.svg';
import congrats from '../images/congrats.svg';
import RecentPostCard from './RecentPostCard';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts, listLatestPosts } from '../actions/postActions';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingLanding, setLoadingLanding] = useState(true);

  const handleClick = () => {
    navigate('/editor');
  };

  const postList = useSelector((state) => state.postsList);
  const latestPosts = useSelector((state) => state.topposts);
  const postById = useSelector((state) => state.postsById);
  const { loading, error, posts } = postList;
  const {
    loading: loadingTopPosts,
    error: errorTopPosts,
    posts: topPosts,
  } = latestPosts;
  const {
    loading: loadingPostById,
    error: errorPostById,
    posts: postsById,
  } = postById;

  setTimeout(() => {
    topPosts ? setLoadingLanding(false) : setLoadingLanding(true);
  }, 1000);

  useEffect(() => {
    dispatch(listPosts());
    dispatch(listLatestPosts());
  }, dispatch);

  return (
    <>
      {loadingLanding ? (
        <Spinner />
      ) : (
        <>
          <div className='hero'>
            <div className='image-blog-write'>
              <img src={writeBlog} alt='writeBlog' />
            </div>
            <div className='hero-text'>
              <h2>Write Your Own Blog</h2>
              <h3>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                tenetur laborum laudantium, quae aut eligendi itaque. Lorem
                ipsum dolor sit amet.
              </h3>
              <div className='start-button'>
                <button onClick={handleClick}>Let's Start</button>
              </div>
            </div>
          </div>
          <section className='instructions'>
            <div className='cards'>
              <div className='card'>
                <img src={createProfile} alt='' />
                <p>Create your profile.</p>
              </div>
              <div className='card'>
                <img src={writeFirstBlog} alt='' />
                <p>Write Your Blog</p>
              </div>
              <div className='card'>
                <img src={congrats} alt='' />
                <p>Congrats for your first blog.</p>
              </div>
            </div>
          </section>
          <section className='latestPosts'>
            <div className='postwrapper'>
              <div className='latestPosts'>
                <h1>Latest Articles..</h1>
                {posts.map((eachPost) => (
                  <RecentPostCard
                    id={eachPost._id}
                    key={eachPost.id}
                    title={eachPost.title}
                    photo={eachPost.photo}
                    description={eachPost.description}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default LandingPage;
