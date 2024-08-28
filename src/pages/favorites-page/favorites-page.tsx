import { Offer, OffersByCity } from '../../types';
import { useAppSelector } from '../../hooks';
import { getFavorite } from '../../store/favorite/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PlaceCard from '../../components/place-card/place-card';
import HeaderAuth from '../../components/header/header-auth';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

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
  const offers = useAppSelector(getFavorite);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  const sortedOffers = Object.groupBy(offers, (item) => item.city.name);

  return (
    <div className={`page ${offers.length === 0 ? 'page--favorites-empty' : ''}`}>
      <Header>
        <HeaderAuth />
      </Header>

      <main className={`page__main page__main--favorites ${offers.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {offers.length === 0 ?
            <FavoritesEmpty /> :
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(sortedOffers as OffersByCity).map((item) => <FavoritesLocation key={item[0]} city={item[0]} localOffers={item[1]} />)}
              </ul>
            </section>}
        </div>
      </main>

      <Footer />
    </div>
  );
}
