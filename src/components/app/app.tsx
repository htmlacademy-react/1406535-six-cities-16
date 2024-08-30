import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice/selectors';
import { getOffersStatus } from '../../store/data-slice/selectors';
import { checkAuthAction, fetchOffersAction } from '../../store/api-action';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import PrivateRoot from '../private-root/private-root';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import Loader from '../loader/loader';

export default function App() {
  const authStatus = useAppSelector(getAuthStatus);
  const isLoading = useAppSelector(getOffersStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Unknown) {
      dispatch(checkAuthAction());
    }
    if (authStatus !== AuthorizationStatus.Unknown) {
      dispatch(fetchOffersAction());
    }
  }, [authStatus, dispatch]);


  if (authStatus === AuthorizationStatus.Unknown || isLoading === RequestStatus.Loading) {
    return <Loader />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<PrivateRoot noAuth><LoginPage /></PrivateRoot>} />
        <Route path={AppRoute.Favorites} element={<PrivateRoot><FavoritesPage /></PrivateRoot>} />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}
