// src/redux/reducers/postReducer.js
import { CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from '../actions/postActions';

const initialState = {
  loading: false,
  post: null,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
