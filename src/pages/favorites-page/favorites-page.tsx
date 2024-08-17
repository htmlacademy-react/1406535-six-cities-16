import { Offer } from '../../types';
import { sortFavoritesByCities } from '../../utils';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PlaceCard from '../../components/place-card/place-card';

type FavoritesPageProps = {
  offers: Offer[];
}

type FavoritesLocationProps = {
  city: string;
  localOffers: Offer[];
}

function FavoritesLocation({city, localOffers}: FavoritesLocationProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {localOffers.map((offer) => <PlaceCard key={offer.id} offer={offer} classPrefix="favorites" />)}
      </div>
    </li>
  );
}

function FavoritesPage({offers}: FavoritesPageProps) {
  const sortedOffers = sortFavoritesByCities(offers);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(sortedOffers).map((item) => <FavoritesLocation key={item[0]} city={item[0]} localOffers={item[1] as Offer[]} />)}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesPage;
