import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { fetchOffers } from './store/common-slice';
import App from './components/app/app';
import store from './store';

store.dispatch(fetchOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
