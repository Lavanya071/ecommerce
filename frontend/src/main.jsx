import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
