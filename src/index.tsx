import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const FOUND_OFFERS = 300 as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App foundOffers={FOUND_OFFERS}/>
  </React.StrictMode>
);
