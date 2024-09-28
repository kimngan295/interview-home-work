// src/redux/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGOUT } from '../actions/authActions';

const initialState = {
  token: null, // Không lấy từ localStorage để sử dụng redux-persist
  isAuthenticated: false, // Không xác định trạng thái đăng nhập ngay lập tức
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,  // Lưu token vào Redux state
        isAuthenticated: true,  // Đánh dấu là đã đăng nhập
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,           // Xóa token
        isAuthenticated: false, // Đánh dấu là chưa đăng nhập
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
