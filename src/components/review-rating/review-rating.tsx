import { MAX_RATING, RATING_ITEMS } from '../../const';

type RatingStarProps = {
  value: number;
  title: string;
  onChange: (evt: { target: { name: string; value: string } }) => void;
}

function RatingStar({value, title, onChange}: RatingStarProps) {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" onChange={onChange} />
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

type ReviewRatingProps = {
  onChange: (evt: { target: { name: string; value: string } }) => void;
}

function ReviewRating({onChange}: ReviewRatingProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {RATING_ITEMS.map((item, index) => <RatingStar key={item} value={MAX_RATING - index} title={item} onChange={onChange} />)}
    </div>
  );
}

export default ReviewRating;
