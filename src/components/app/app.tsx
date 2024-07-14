import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  foundOffers: number;
}

function App({foundOffers}: AppProps) {
  return (
    <MainPage foundOffers={foundOffers}/>
  );
}

export default App;
