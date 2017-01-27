import AppRouter from './AppRouter';
import React from 'react';
import ReactDOM from 'react-dom';

window.onload = () => {
  ReactDOM.render(<AppRouter />, document.getElementById('main'));
};
