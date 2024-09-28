// src/redux/sagas.js
import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { fetchBlogsSuccess, fetchBlogsFailure } from '../actions/getBlogActions';

function* fetchBlogs(action) {
  try {
    const response = yield call(axios.get, `https://interview-home-work-backend.onrender.com/posts/?page=${action.payload.page}`);
    const { posts, totalPages } = response.data.data; // Đảm bảo rằng bạn truy cập đúng dữ liệu
    yield put(fetchBlogsSuccess(posts, action.payload.page, totalPages)); // Gọi action thành công
  } catch (error) {
    yield put(fetchBlogsFailure(error.message)); // Gọi action thất bại nếu cần
  }
}

export function* watchFetchBlogs() {
  yield takeEvery('FETCH_BLOGS_REQUEST', fetchBlogs); // Lắng nghe action FETCH_BLOGS_REQUEST
}
