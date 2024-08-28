import { OffersByCity, Offer, CompleteOffer } from '../../types';
import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { getFavorite } from '../../store/favorite/selectors';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PlaceCard from '../../components/place-card/place-card';
import HeaderAuth from '../../components/header/header-auth';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

type FavoritesLocationProps = {
  city: string;
  localOffers: Array<Offer | CompleteOffer>;
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
  const sortedOffers: OffersByCity = useMemo(() => {
    if (offers.length === 0) {
      return {};
    }
    return Object.groupBy(offers, (offer) => offer.city.name);
  }, [offers]);

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
                {Object.entries(sortedOffers).map((item) => <FavoritesLocation key={item[0]} city={item[0]} localOffers={item[1]} />)}
              </ul>
            </section>}
        </div>
      </main>

      <Footer />
    </div>
  );
}
