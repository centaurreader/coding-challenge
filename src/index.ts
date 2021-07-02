import React from 'react';
import ReactDOM from 'react-dom';

// polyfills
import 'regenerator-runtime/runtime';
import 'core-js/stable';

import App from './App';

ReactDOM.render(
  React.createElement(App, [], []),
  document.getElementById('app'),
);
