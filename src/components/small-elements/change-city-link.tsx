import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCity } from '../../store/data/data-slice';
import { findCity } from '../../utils';
import { AppRoute } from '../../const';

type ChangeCityLinkProps = {
  city: string;
}

export default function ChangeCityLink({city}: ChangeCityLinkProps) {
  const dispatch = useDispatch();

  const handleCityChange = () => dispatch(setCity(findCity(city)));

  return (
    <div className="locations__item">
      <Link to={AppRoute.Root} className="locations__item-link" onClick={handleCityChange}>
        <span>{city}</span>
      </Link>
    </div>
  );
}
