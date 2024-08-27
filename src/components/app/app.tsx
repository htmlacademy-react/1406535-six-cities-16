import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user/selectors';
import { getOffersStatus } from '../../store/data/selectors';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import PrivateRoot from '../private-root/private-root';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

export default function App() {
  const authStatus = useAppSelector(getAuthStatus);
  const isLoading = useAppSelector(getOffersStatus);

  if (authStatus === AuthorizationStatus.Unknown || isLoading === RequestStatus.Loading) {
    return (<p>Loading ...</p>);
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Favorites} element={<PrivateRoot><FavoritesPage /></PrivateRoot>} />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </HistoryRouter>
  );
}
