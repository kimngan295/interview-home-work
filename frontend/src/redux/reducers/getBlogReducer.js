// src/redux/reducers/getBlogReducer.js
const initialState = {
  posts: [], // Đổi từ blogPost thành posts
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const getBlogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BLOGS_REQUEST':
    
      return { ...state, loading: true, error: null };
    case 'FETCH_BLOGS_SUCCESS':
     
      return {
        ...state,
        posts: action.payload.posts,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    case 'FETCH_BLOGS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getBlogReducer;
