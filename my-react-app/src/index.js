import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import {Auth0Provider} from '@auth0/auth0-react'
import Constants from './Credentials';
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
ReactDOM.render(<Auth0Provider
                  domain = {Constants.AUTH0_DOMAIN}
                  clientId = {Constants.AUTH0_CLIENT_ID}
                  redirectUri = {window.location.origin}
                > <App /> </Auth0Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
