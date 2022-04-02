import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentPostCard = ({ id, title, photo, description }) => {
  let navigate = useNavigate();

  return (
    <>
      <div className='postCard'>
        <div className='articleImage'>
          <img src={photo.substring(10)} alt='imageArticle' />
        </div>
        <div className='article-details'>
          <div className='articleTitle'>
            <h3>{title}</h3>
          </div>
          <div className='article-description'>
            <p>{description}</p>
          </div>
          <div className='read-btn'>
            <button onClick={() => navigate(`/article/${id}`)}>
              Read Article
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentPostCard;
