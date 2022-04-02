import {
  LIST_MY_POSTS_REQUEST,
  LIST_MY_POSTS_SUCCESS,
  LIST_MY_POSTS_FAIL,
  LIST_LATEST_POSTS_REQUEST,
  LIST_LATEST_POSTS_SUCCESS,
  LIST_LATEST_POSTS_FAIL,
  LIST_POST_BY_ID_REQUEST,
  LIST_POST_BY_ID_SUCCESS,
  LIST_POST_BY_ID_FAIL,
  LIST_USER_POSTS_REQUEST,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  LIST_USER_POSTS_SUCCESS,
  LIST_USER_POSTS_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_REQUEST,
  UPDATE_POST_REQUEST,
  DELETE_POST_FAIL,
} from '../constants/postConstants';
import axios from 'axios';

// getPostsByKeyword

export const listPosts = (searchType, keyword) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_MY_POSTS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/api/posts?searchType=${searchType}&keyword=${keyword}`
    );

    dispatch({
      type: LIST_MY_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_MY_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLatestPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_LATEST_POSTS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/api/posts/topposts`
    );

    dispatch({
      type: LIST_LATEST_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_LATEST_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPostsById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_POST_BY_ID_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);

    dispatch({
      type: LIST_POST_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_POST_BY_ID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUserPosts = (user) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_USER_POSTS_REQUEST,
    });

    const { data } = await axios.get(
      `http://localhost:5000/api/posts?user=${user}`
    );

    dispatch({
      type: LIST_USER_POSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_USER_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (newData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
    });

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/posts/newpost`,
      newData,
      config
    );

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePost = (updatedData, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_POST_REQUEST,
    });

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/posts/${id}`,
      updatedData,
      config
    );

    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUserPost = (postId, username) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_POST_REQUEST,
    });

    const config = {
      headers: { 'content-type': 'application/json' },
    };

    const { data } = await axios.delete(
      `http://localhost:5000/api/posts/${postId}`,
      { data: { username } },
      config
    );

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
