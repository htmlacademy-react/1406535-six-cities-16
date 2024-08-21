import { City } from '../../types';
import LocationItem from './location-item';

type LocationListProps = {
  cities: City[];
  activeCity: string;
  onChange: (city: string) => void;
}

export default function LocationList({cities, activeCity, onChange}: LocationListProps) {
  const citiesList = cities.map((city) => city.name);

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {citiesList.map((city) => <LocationItem key={city} city={city} activeCity={activeCity} onChange={onChange}/>)}
      </ul>
    </section>
  );
}
