// src/redux/sagas/authSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { signupUser } from '../../services/api';
function* signupRequest(action) {
  try {
    const response = yield call(axios.post, 'https://interview-home-work-backend.onrender.com/users/sign-up', action.payload);
    if (response.data.status === "success") {
      yield put({ type: 'SIGNUP_SUCCESS', payload: response.data.message });
    } else {
      yield put({ type: 'SIGNUP_FAILURE', payload: response.data.message });
    }
  } catch (error) {
    yield put({ type: 'SIGNUP_FAILURE', payload: error.response?.data?.message || 'Something went wrong' });
  }
}

export function* watchSignup() {
  yield takeLatest('SIGNUP_REQUEST', signupRequest);
}
