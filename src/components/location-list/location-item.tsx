import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { AppRoute } from '../../const';

type LocationItemProps = {
  city: string;
  activeCity: string;
  onChange: (city: string) => void;
}

export default function LocationItem({city, activeCity, onChange}: LocationItemProps) {
  return (
    <li className="locations__item">
      <Link to={AppRoute.Root} className={clsx('locations__item-link', 'tabs__item', {'tabs__item--active': city === activeCity})} onClick={() => onChange(city)}>
        <span>{city}</span>
      </Link>
    </li>
  );
}
