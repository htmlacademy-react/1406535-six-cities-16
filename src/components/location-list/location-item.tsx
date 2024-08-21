type LocationItemProps = {
  city: string;
  activeCity: string;
  onChange: (city: string) => void;
}

export default function LocationItem({city, activeCity, onChange}: LocationItemProps) {
  return (
    <li className="locations__item" onClick={() => onChange(city)}>
      <a className={`locations__item-link tabs__item ${city === activeCity && 'tabs__item--active'}`} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
}
