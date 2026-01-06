import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from './store/store';
import App from './App';
import './App.css';
import axios from 'axios';

//url de base 
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// autorisation de l'envoi de cookie (CORS)
axios.defaults.withCredentials= true;

//Hearder par défaut
axios.defaults.headers.common['x-Requested-with'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);