import { MAX_RATING, RATING_ITEMS } from '../../const';
import RatingStar from './rating-star';

export default function ReviewRating() {
  return (
    <div className="reviews__rating-form form__rating">
      {RATING_ITEMS.map((item, index) => <RatingStar key={item} value={MAX_RATING - index} title={item} />)}
    </div>
  );
}
