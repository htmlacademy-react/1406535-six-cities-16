import { Offer } from '../../types';
import { capitalizeFirstLetter, convertScoreToPercent } from '../../utils';
import { MAX_RATING } from '../../const';
import PremiumMark from '../small-elements/premium-mark';

type PlaceCardProps = {
  offer: Offer;
  classPrefix: string;
}

function PlaceCard({offer, classPrefix}: PlaceCardProps) {
  const {title, type, price, previewImage, isFavorite, isPremium, rating} = offer;
  const size = classPrefix === 'favorites' ? [150, 110] : [260, 200];

  return (
    <article className={`${classPrefix}__card place-card`} data-id={offer.id}>
      {isPremium ? <PremiumMark /> : null}
      <div className={`${classPrefix}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={previewImage} width={size[0]} height={size[1]} alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`${isFavorite ? 'place-card__bookmark-button--active' : null} place-card__bookmark-button button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: convertScoreToPercent(rating, MAX_RATING)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
