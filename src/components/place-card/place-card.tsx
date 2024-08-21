import { Offer } from '../../types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils';
import { AppRoute } from '../../const';
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
  const {title, type, price, previewImage, isFavorite, isPremium, rating} = offer;
  const size = classPrefix === 'favorites' ? [150, 110] : [260, 200];
  const [favorite, setFavorite] = useState(isFavorite);

  const handleMouseEnter = () => onHover ? onHover(offer) : null;
  const handleMouseLeave = () => onHover ? onHover() : null;

  return (
    <article className={`${classPrefix}__card place-card`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isPremium && <PremiumMark classPrefix="place-card" />}
      <div className={`${classPrefix}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width={size[0]} height={size[1]} alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <Price classPrefix="place-card" price={price} />
          <FavoriteMark classPrefix="place-card" isFavorite={favorite} onClick={() => setFavorite(!favorite)}/>
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
