// src/redux/rootSaga.js
import { all } from 'redux-saga/effects';
import watchLogin from './authSaga';
import { watchSignup } from './signupSaga';
import { watchCreatePost } from './postSaga';
import { watchFetchBlogs } from './getBlogSaga'; // Đảm bảo import đúng
import {watchFetchUserDetails} from './getInfSaga'
export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchCreatePost(),
    watchFetchBlogs(),
    watchFetchUserDetails(), // Thêm watcher fetch blogs
    // Đưa vào các watcher khác ở đây
  ]);
}
