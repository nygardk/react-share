/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './Demo';

const rootElement = document.createElement('div');

if (!document.querySelector('div')) {
  document.body.appendChild(rootElement);
}

ReactDOM.render(<Demo />, rootElement);

if (module.hot) {
  module.hot.accept();
}
