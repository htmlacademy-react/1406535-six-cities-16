import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-action';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoot from '../private-root/private-root';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { OFFERS } from '../../mocks/offers';

export default function App() {
  const authStatus = useAppSelector((state) => state.authStatus);
  const isLoading = useAppSelector((state) => state.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [authStatus, dispatch]);

  if (authStatus === AuthorizationStatus.Unknown || isLoading) {
    return (
      <p>Loading ...</p>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} />
        <Route path={AppRoute.Login}
          element={
            <PrivateRoot sign="common">
              <LoginPage />
            </PrivateRoot>
          }
        />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoot sign="private">
              <FavoritesPage offers={OFFERS} />
            </PrivateRoot>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
