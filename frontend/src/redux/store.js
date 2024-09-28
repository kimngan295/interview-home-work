import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Chọn localStorage cho redux-persist
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer'; // Cập nhật đường dẫn cho phù hợp
import rootSaga from './sagas/rootSaga'; // Cập nhật đường dẫn cho phù hợp

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage,
};

// Tạo persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

// Tạo store với persistedReducer
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

// Chạy saga middleware
sagaMiddleware.run(rootSaga); // Chạy rootSaga

// Tạo persistor
const persistor = persistStore(store);

// Xuất store và persistor
export { store, persistor };
