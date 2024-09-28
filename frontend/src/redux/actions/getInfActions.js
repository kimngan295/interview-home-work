// redux/actions/getInfActions.js
export const FETCH_USER_DETAILS_REQUEST = 'FETCH_USER_DETAILS_REQUEST';
export const FETCH_USER_DETAILS_SUCCESS = 'FETCH_USER_DETAILS_SUCCESS';
export const FETCH_USER_DETAILS_FAILURE = 'FETCH_USER_DETAILS_FAILURE';

// Action để gọi API lấy thông tin người dùng
export const fetchUserDetailsRequest = (userId) => ({
  type: FETCH_USER_DETAILS_REQUEST,
  payload: userId,
});

// Action khi lấy thông tin thành công
export const fetchUserDetailsSuccess = (userDetails) => ({

  type: FETCH_USER_DETAILS_SUCCESS,
  payload: userDetails,
});

// Action khi có lỗi
export const fetchUserDetailsFailure = (error) => ({
  type: FETCH_USER_DETAILS_FAILURE,
  payload: error,
});
