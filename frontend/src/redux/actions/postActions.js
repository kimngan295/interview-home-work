// src/redux/actions/postActions.js
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

// Action để gửi yêu cầu tạo post
export const createPostRequest = (postData) => ({
  type: CREATE_POST_REQUEST,
  payload: postData,
});

// Action cho kết quả thành công
export const createPostSuccess = (response) => ({
  type: CREATE_POST_SUCCESS,
  payload: response,
});

// Action cho kết quả thất bại
export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});
