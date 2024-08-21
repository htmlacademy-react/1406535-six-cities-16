import { Offer } from '../../types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getCitiesArray } from '../../utils';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoot from '../private-root/private-root';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

type AppProps = {
  offers: Offer[];
}

export default function App({offers}: AppProps) {
  const places = getCitiesArray(offers);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage offers={offers} places={places} />} />
        <Route path={AppRoute.Login} element={<LoginPage/>} />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoot authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage offers={offers} />
            </PrivateRoot>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
