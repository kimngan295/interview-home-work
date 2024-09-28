import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccess, loginFailure } from '../actions/authActions'; // Import các action
import { loginUser } from '../../services/api';
import { jwtDecode } from 'jwt-decode';
function* loginRequest(action) {
  try {
    // Gửi request tới API đăng nhập
    const response = yield call(axios.post, 'https://interview-home-work-backend.onrender.com/users/sign-in', {
      username: action.payload.username,
      password: action.payload.password,
    });
    // const response = yield call(loginUser, {
    //   username: action.payload.username,
    //   password: action.payload.password,
    // });
    // Kiểm tra kết quả response
    if (response.data.status === "success") {
      const accessToken = response.data.data.accessToken;
   
      // const decodedToken = jwtDecode(accessToken);
      // const user = {
      //   id: decodedToken.userID, // Giả sử userId nằm trong token
      //   // Thêm các thông tin khác nếu có
      // };
      // console.log("User", user);
      // Dispatch action loginSuccess để cập nhật Redux state
      yield put(loginSuccess(accessToken));
    } else {
      // Nếu có lỗi từ server, dispatch loginFailure
      yield put(loginFailure(response.data.message));
    }
  } catch (error) {
    // Xử lý lỗi khi gọi API thất bại
    yield put(loginFailure(error.response?.data?.message || 'Something went wrong'));
  }
}

// Saga theo dõi action LOGIN_REQUEST
export default function* watchLogin() {
  yield takeLatest('LOGIN_REQUEST', loginRequest);
}
