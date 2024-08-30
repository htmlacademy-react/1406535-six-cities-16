import { MAX_RATING, RATING_ITEMS } from '../../const';
import RatingStar from './rating-star';

type ReviewRatingProps = {
  isDisabled: boolean;
  rating: number;
  onChange: (newRating: number) => void;
}

export default function ReviewRating({isDisabled, onChange, rating}: ReviewRatingProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {RATING_ITEMS.map((item, index) => <RatingStar key={item} value={MAX_RATING - index} title={item} isDisabled={isDisabled} onChange={onChange} rating={rating}/>)}
    </div>
  );
}
