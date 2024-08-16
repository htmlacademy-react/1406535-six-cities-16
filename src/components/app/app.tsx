import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoot from '../private-root/private-root';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { Offer } from '../../types';

type AppProps = {
  offers: Offer[];
}

function App({offers}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage offers={offers} />} />
        <Route path={AppRoute.Login} element={<LoginPage/>} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoot authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage />
            </PrivateRoot>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
