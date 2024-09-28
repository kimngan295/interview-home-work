// src/redux/actions/getBlogActions.js
const FETCH_BLOGS_REQUEST = "FETCH_BLOGS_REQUEST"; // Đổi tên cho đúng
const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS"; // Đổi tên cho đúng
const FETCH_BLOGS_FAILURE = "FETCH_BLOGS_FAILURE"; // Đổi tên cho đúng

export const fetchBlogsRequest = (page) => ({
  type: FETCH_BLOGS_REQUEST,
  payload: { page },
});

export const fetchBlogsSuccess = (posts, page, totalPages) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: { posts, page, totalPages },
});

export const fetchBlogsFailure = (error) => ({
  type: FETCH_BLOGS_FAILURE,
  payload: { error },
});
