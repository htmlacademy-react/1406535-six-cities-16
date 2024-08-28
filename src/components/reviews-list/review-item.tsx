import { Review } from '../../types';
import { getDateMY, getDateYMD } from '../../utils';
import Rating from '../small-elements/rating';

export default function ReviewItem(props: Review) {
  const {rating, comment, user, date} = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt={`${user.name} avatar`} />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating classPrefix="reviews" rating={rating}/>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={getDateYMD(date)}>{getDateMY(date)}</time>
      </div>
    </li>
  );
}
