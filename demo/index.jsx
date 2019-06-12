/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

const rootElement = document.createElement('div');

if (!document.querySelector('div')) {
  document.body.appendChild(rootElement);
}

ReactDOM.render(<Root />, rootElement);
