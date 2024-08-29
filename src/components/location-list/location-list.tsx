import { CITIES } from '../../const';
import LocationItem from './location-item';

type LocationListProps = {
  activeCity: string;
  onChange: (city: string) => void;
}

export default function LocationList({activeCity, onChange}: LocationListProps) {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => <LocationItem key={city.name} city={city.name} activeCity={activeCity} onChange={onChange}/>)}
        </ul>
      </section>
    </div>
  );
}
