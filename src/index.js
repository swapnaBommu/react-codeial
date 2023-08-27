import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css';
import { App } from './components';
import { AuthProvider,PostsProvider } from './providers';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <BrowserRouter>
        <AuthProvider>
          <PostsProvider>
            <App />
          </PostsProvider>
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
