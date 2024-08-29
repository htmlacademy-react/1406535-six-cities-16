import clsx from 'clsx';

type LocationItemProps = {
  city: string;
  activeCity: string;
  onChange: (city: string) => void;
}

export default function LocationItem({city, activeCity, onChange}: LocationItemProps) {
  return (
    <li className="locations__item" onClick={() => onChange(city)}>
      <a className={clsx('locations__item-link tabs__item', {'tabs__item--active': city === activeCity})}>
        <span>{city}</span>
      </a>
    </li>
  );
}
