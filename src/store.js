import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  listMyPostsReducer,
  listPostsUser,
  updatepost,
} from '../src/reducers/postReducers';
import {
  listLatestPostsReducer,
  listPostsById,
  updatePost,
  newPost,
  deletePost,
} from '../src/reducers/postReducers';
import { createUser, loginUser } from './reducers/userReducers';

const reducer = combineReducers({
  postsList: listMyPostsReducer,
  topposts: listLatestPostsReducer,
  postsById: listPostsById,
  updateUserPost: updatePost,
  createNewPost: newPost,
  userPosts: listPostsUser,
  createdUser: createUser,
  userLogin: loginUser,
  deleteUserPost: deletePost,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const intialState = {
  userLogin: { user: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
