// src/redux/sagas/postSaga.js
import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { CREATE_POST_REQUEST, createPostSuccess, createPostFailure } from '../actions/postActions';

// Lấy accessToken từ Redux store
// const getAccessToken = (state) => state.auth.accessToken;

function* createPostSaga(action) {
  try {
    const { title, content, tags, accessToken } = action.payload;
    // Lấy accessToken từ payload
    const response = yield call(axios.post, 'https://interview-home-work-backend.onrender.com/posts/new-post', 
      { title, content, tags }, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Đính kèm accessToken vào header
        },
      }
    );
    yield put(createPostSuccess(response.data)); // Dispatch success action nếu thành công
  } catch (error) {
    yield put(createPostFailure(error.message)); // Dispatch failure action nếu thất bại
  }
}


export function* watchCreatePost() {
  yield takeLatest(CREATE_POST_REQUEST, createPostSaga);
}
