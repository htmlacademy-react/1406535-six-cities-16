import { Offer } from '../../types';
import { sortFavoritesByCities } from '../../utils';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PlaceCard from '../../components/place-card/place-card';
import HeaderAuth from '../../components/header/header-auth';
import { OFFERS } from '../../mocks/offers';

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
        {localOffers.map((offer) => <PlaceCard key={offer.id} classPrefix="favorites" offer={offer} />)}
      </div>
    </li>
  );
}

export default function FavoritesPage() {
  const sortedOffers = sortFavoritesByCities(OFFERS);

  return (
    <div className="page">
      <Header>
        <HeaderAuth />
      </Header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(sortedOffers).map((item) => <FavoritesLocation key={item[0]} city={item[0]} localOffers={item[1]} />)}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
