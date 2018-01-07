/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './Demo';

ReactDOM.render(<Demo />, document.querySelector('#content'));

if (module.hot) {
  module.hot.accept();
}
