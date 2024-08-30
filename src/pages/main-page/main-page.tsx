import { Offer, Point } from '../../types';
import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCity, getOffers } from '../../store/data-slice/selectors';
import { setCity } from '../../store/data-slice/data-slice';
import { getPoint, getNumeralEnding, sort, isEmptyArray, findCity } from '../../utils';
import { MapHeight, SortingOption } from '../../const';
import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import LocationList from '../../components/location-list/location-list';
import SortingList from '../../components/sorting-list/sorting-list';
import EmptyPlacesList from '../../components/small-elements/empty-places-list';
import HeaderAuth from '../../components/header/header-auth';
import clsx from 'clsx';

type Sorting = {
  activeSort: string;
  isOpen: boolean;
}

const initialSorting = {
  activeSort: SortingOption.Default,
  isOpen: false,
};

export default function MainPage() {
  const offers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [sorting, setSorting] = useState<Sorting>(initialSorting);
  const [localOffers, setLocalOffers] = useState<Offer[]>([]);
  const [localPoints, setLocalPoints] = useState<Point[]>([]);

  useEffect(() => {
    setLocalOffers(offers.filter((offer) => offer.city.name === activeCity.name));
  }, [offers, activeCity]);

  useEffect(() => {
    setLocalPoints(localOffers.map(getPoint));
  }, [localOffers]);

  const sortedOffers = useMemo(() => {
    if (isEmptyArray(localOffers)) {
      return [];
    }
    return sort(localOffers, sorting.activeSort);
  }, [localOffers, sorting.activeSort]);

  const handleOfferHover = (offer?: Offer) => {
    setActiveOffer(offer || null);
  };

  const handleCityChange = (cityName: string) => {
    dispatch(setCity(findCity(cityName)));
    setSorting(initialSorting);
  };

  const handleSortChange = (sortType: string) => {
    setSorting({activeSort: sortType, isOpen: false});
  };

  const handleSortToggle = () => {
    setSorting({...sorting, isOpen: !sorting.isOpen});
  };

  return (
    <div className="page page--gray page--main">
      <Header>
        <HeaderAuth />
      </Header>

      <main className={clsx('page__main', 'page__main--index', isEmptyArray(localOffers) && 'page__main--index-empty')}>
        <h1 className="visually-hidden">Cities</h1>
        <LocationList activeCity={activeCity.name} onChange={handleCityChange} />
        <div className="cities">
          <div className={clsx('cities__places-container', isEmptyArray(localOffers) && 'cities__places-container--empty', 'container')}>
            {!localOffers.length ?
              <EmptyPlacesList city={activeCity.name} /> :
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{getNumeralEnding(localOffers.length, 'place')} to stay in {activeCity.name}</b>
                <SortingList activeSort={sorting.activeSort} isOpen={sorting.isOpen} onChange={handleSortChange} onToggle={handleSortToggle} />
                <PlacesList offers={sortedOffers} onHover={handleOfferHover} />
              </section>}
            <div className="cities__right-section">
              {!isEmptyArray(localOffers) &&
              <section className="cities__map map" style={{backgroundImage: 'none'}}>
                <Map points={localPoints} activePoint={activeOffer && getPoint(activeOffer)} height={MapHeight.MainPage} />
              </section>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
