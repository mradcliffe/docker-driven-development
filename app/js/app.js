import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import RootComponent from './root/root.component';

import './app.scss';

render(
  <Provider store={store}>
    <RootComponent />
  </Provider>,
  document.getElementById('app'),
);
