import { Offer } from '../../types';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCityAction } from '../../store/action';
import { getPoint, getNumeralEnding, sort } from '../../utils';
import { CITIES, DEFAULT_CITY, MapHeight, SortingOption } from '../../const';
import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import LocationList from '../../components/location-list/location-list';
import SortingList from '../../components/sorting-list/sorting-list';

type MainPageProps = {
  offers: Offer[];
}

type Sorting = {
  activeSort: string;
  isOpen: boolean;
}

const initialSorting = {
  activeSort: SortingOption.Default,
  isOpen: false,
};

export default function MainPage({offers}: MainPageProps) {
  const activeCity = useAppSelector((state) => state.activeCity);
  const dispatch = useAppDispatch();
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);

  const [sorting, setSorting] = useState<Sorting>(initialSorting);

  const localOffers = offers.filter((offer) => offer.city.name === activeCity?.name);
  const localPoints = localOffers.map(getPoint);

  const getCity = (cityName: string) => CITIES.find((city) => city.name === cityName) || DEFAULT_CITY;
  const sortedOffers = sorting.activeSort === SortingOption.Default ? localOffers : sort[sorting.activeSort](localOffers);

  const handleOfferHover = (offer?: Offer) => {
    setActiveOffer(offer || null);
  };

  const handleCityChange = (cityName: string) => {
    dispatch(setCityAction(getCity(cityName)));
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
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationList cities={CITIES} activeCity={activeCity.name} onChange={handleCityChange} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{getNumeralEnding(localOffers.length, 'place')} to stay in {activeCity.name}</b>
              <SortingList activeSort={sorting.activeSort} isOpen={sorting.isOpen} onChange={handleSortChange} onToggle={handleSortToggle} />
              <PlacesList offers={sortedOffers} onHover={handleOfferHover} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" style={{backgroundImage: 'none'}}>
                <Map points={localPoints} activePoint={activeOffer && getPoint(activeOffer)} height={MapHeight.MainPage} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
