// src/redux/actions/authActions.js

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action để gửi yêu cầu đăng nhập
export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});

// Action để xử lý khi đăng nhập thành công
export const loginSuccess = (data) => {
  const token = data;

  // Lưu token vào localStorage để dùng sau
  // localStorage.setItem('accessToken', token);

  return {
    type: LOGIN_SUCCESS,
    payload: token,
  };
};

// Action để xử lý khi đăng nhập thất bại
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Action để xử lý khi người dùng đăng xuất
export const logout = () => {
  // Xóa access token khỏi localStorage
  localStorage.removeItem('accessToken');

  return {
    type: LOGOUT,
  };
};
