import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authReducer';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'isAuthenticated'], // Lưu trữ thông tin user và trạng thái đăng nhập
};

export default persistReducer(persistConfig, authReducer);
