import MainPage from '../../pages/main-page/main-page';
// import FavoritesPage from '../../pages/favorites-page/favorites-page';
// import LoginPage from '../../pages/login-page/login-page';
// import OfferPage from '../../pages/offer-page/offer-page';

type AppProps = {
  foundOffers: number;
}

function App({foundOffers}: AppProps) {
  return (
    <MainPage foundOffers={foundOffers}/>
  );
}

export default App;
