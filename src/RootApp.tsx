import React from 'react';
import { Provider } from 'react-redux';
import App from './view/App';
import store from './redux/store/store';

const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default RootApp;
