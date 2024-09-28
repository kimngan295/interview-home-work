import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Reducer quản lý trạng thái đăng nhập
import signupReducer from './signupReducer';
import postReducer from './postReducer';
import getBlogReducer from './getBlogReducer';
import dialogBlogReducer from './dialogPostReducer';
const rootReducer = combineReducers({
  auth: authReducer, 
  signup: signupReducer,
  post: postReducer,
  getBlog: getBlogReducer,  // Reducer quản lý lấy blog theo ID
  dialogBlog: dialogBlogReducer,
});

export default rootReducer;
