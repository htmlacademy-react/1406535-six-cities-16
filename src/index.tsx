import { Offer } from './types';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app/app';
import { OFFERS } from './mocks/offers';

const offers = [] as Offer[];
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={OFFERS} />
    </Provider>
  </React.StrictMode>
);
