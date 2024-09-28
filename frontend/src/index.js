import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store'; // Nhập store và persistor
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'; // Nhập PersistGate

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Bọc ứng dụng với Provider */}
      <PersistGate loading={null} persistor={persistor}> {/* Bọc ứng dụng với PersistGate */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
