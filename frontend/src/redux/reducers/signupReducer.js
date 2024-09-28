// src/redux/reducers/authReducer.js
const initialState = {
    accessToken: null,
    error: null,
    signupMessage: null, // Thêm state cho thông báo đăng ký
  };
  
  const signupReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP_SUCCESS':
        return {
          ...state,
          signupMessage: action.payload, // Lưu thông báo thành công
          error: null,
        };
      case 'SIGNUP_FAILURE':
        return {
          ...state,
          error: action.payload,
        };
        case 'RESET_SIGNUP_MESSAGE': // Reset lại trạng thái
        return {
          ...state,
          signupMessage: '', // Xóa thông báo sau khi chuyển trang
        };
      default:
        return state;
    }
  };
  
  export default signupReducer;
  