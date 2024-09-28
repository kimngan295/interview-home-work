// redux/sagas/authSagas.js
import { call, put, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_USER_DETAILS_REQUEST,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
} from '../actions/getInfActions';

function* fetchUserDetailsSaga(action) {
    try {
      const accessToken = yield select((state) => state.auth.token); // Get access token
  
      const response = yield call(axios.get, `https://interview-home-work-backend.onrender.com/users/details/${action.payload}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Attach access token to headers
        },
      });
      
      if (response.data.status === 'success') {
        // Save user's name to local storage
        localStorage.setItem('userName', response.data.data.name); // Adjust according to the structure of your data
        
        yield put(fetchUserDetailsSuccess(response.data.data)); // Dispatch success action
      } else {
        yield put(fetchUserDetailsFailure(response.data.message)); // Dispatch failure action
      }
    } catch (error) {
      yield put(fetchUserDetailsFailure(error.message)); // Dispatch failure action
    }
  }
  
export function* watchFetchUserDetails() {
  yield takeEvery(FETCH_USER_DETAILS_REQUEST, fetchUserDetailsSaga);
}
