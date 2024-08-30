import { Offer, OffersByCity } from '../../types';
import { useAppSelector } from '../../hooks';
import { getFavorite } from '../../store/favorite/selectors';
import { sortOffersByCities, isEmptyArray } from '../../utils';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import PlaceCard from '../../components/place-card/place-card';
import HeaderAuth from '../../components/header/header-auth';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import ChangeCityLink from '../../components/small-elements/change-city-link';
import clsx from 'clsx';

type FavoritesLocationProps = {
  city: string;
  localOffers: Offer[];
}

function FavoritesLocation({city, localOffers}: FavoritesLocationProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <ChangeCityLink city={city} />
      </div>
      <div className="favorites__places">
        {localOffers.map((offer) => <PlaceCard key={offer.id} classPrefix="favorites" offer={offer} />)}
      </div>
    </li>
  );
}

export default function FavoritesPage() {
  const offers = useAppSelector(getFavorite);
  const sortedOffers = sortOffersByCities(offers);

  return (
    <div className={clsx('page', isEmptyArray(offers) && 'page--favorites-empty')}>
      <Header>
        <HeaderAuth />
      </Header>

      <main className={clsx('page__main', 'page__main--favorites', isEmptyArray(offers) && 'page__main--favorites-empty')}>
        <div className="page__favorites-container container">
          {isEmptyArray(offers) ?
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
