import { Offer } from '../../types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice/selectors';
import { changeFavoriteAction, redirectToRoute } from '../../store/api-action';
import { capitalizeFirstLetter } from '../../utils';
import { AppRoute, AuthorizationStatus } from '../../const';
import PremiumMark from '../small-elements/premium-mark';
import FavoriteMark from '../small-elements/favorite-mark';
import Price from '../small-elements/price';
import Rating from '../small-elements/rating';

type PlaceCardProps = {
  offer: Offer;
  classPrefix: 'favorites' | 'near-places' | 'cities';
  onHover?: (offer?: Offer) => void;
}

export default function PlaceCard({offer, classPrefix, onHover}: PlaceCardProps) {
  const authStatus = useAppSelector(getAuthStatus);
  const dispatch = useAppDispatch();
  const {title, type, price, isFavorite, isPremium, rating} = offer;
  const size = classPrefix === 'favorites' ? [150, 110] : [260, 200];
  const [favorite, setFavorite] = useState(isFavorite);

  const handleMouseEnter = () => onHover ? onHover(offer) : null;
  const handleMouseLeave = () => onHover ? onHover() : null;

  const handleFavoriteClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
    }
    dispatch(changeFavoriteAction({id: offer.id, status: favorite ? 0 : 1}));
    setFavorite(!favorite);
  };

  return (
    <article className={`${classPrefix}__card place-card`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isPremium && <PremiumMark classPrefix="place-card" />}
      <div className={`${classPrefix}__image-wrapper place-card__image-wrapper`}>
        <Link to="#">
          <img className="place-card__image" src={offer.previewImage} width={size[0]} height={size[1]} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <Price classPrefix="place-card" price={price} />
          <FavoriteMark classPrefix="place-card" isFavorite={favorite} onClick={handleFavoriteClick}/>
        </div>
        <Rating classPrefix="place-card" rating={rating} />
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', offer.id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}
