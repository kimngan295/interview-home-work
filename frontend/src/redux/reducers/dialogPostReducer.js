// src/redux/reducers/dialogReducer.js
const initialState = {
    isOpen: false,
    post: null,
  };
  
  const dialogBlogReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_DIALOG':
        return {
          ...state,
          isOpen: true,
          post: action.payload,
        };
      case 'CLOSE_DIALOG':
        return {
          ...state,
          isOpen: false,
          post: null,
        };
      default:
        return state;
    }
  };
  
  export default dialogBlogReducer;
  