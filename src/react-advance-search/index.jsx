/* eslint-disable no-unused-expressions */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme/assets/css/style.css';
import './theme/assets/plugins/horizontal-menu/horizontal.css';
import './theme/assets/css/icons.css';

function Index() {
  // if (process.env.NODE_ENV === env.enviroment.dev){
  //   return  (<div className="container body-content">
  //      <App/>
  //   </div>);
  // }
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

const wrapper = document.getElementById('react-container');
wrapper ? ReactDOM.render(<Index />, wrapper) : false;
