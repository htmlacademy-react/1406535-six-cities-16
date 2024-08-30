type RatingStarProps = {
  value: number;
  title: string;
  isDisabled: boolean;
  rating: number;
  onChange: (newRating: number) => void;
}

export default function RatingStar({value, title, isDisabled, rating, onChange}: RatingStarProps) {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" disabled={isDisabled} onChange={(evt) => onChange(Number(evt.target.value))} checked={rating === value}/>
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}
