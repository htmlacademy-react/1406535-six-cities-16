import { FormEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { postReviewAction } from '../../store/api-action';
import { clearStatus } from '../../store/offer-slice/offer-slice';
import { getCommentSendingStatus, getSuccessStatus } from '../../store/offer-slice/selectors';
import ReviewRating from '../review-rating/review-rating';

type ReviewFormProps = {
  id: string;
}

const ValidationMark = {
  TEXT_MIN: 50,
  TEXT_MAX: 300,
} as const;

export default function ReviewForm({id}: ReviewFormProps) {
  const hasSuccess = useAppSelector(getSuccessStatus);
  const isDisabled = useAppSelector(getCommentSendingStatus);
  const dispatch = useAppDispatch();

  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const isButtonDisabled = !(rating > 0 && review.length >= ValidationMark.TEXT_MIN && review.length < ValidationMark.TEXT_MAX);
  const handleRatingChange = (newRating: number) => setRating(newRating);

  useEffect(() => {
    if (hasSuccess) {
      setReview('');
      setRating(0);
      dispatch(clearStatus());
    }
  }, [dispatch, hasSuccess]);

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(postReviewAction({id: id, comment: review, rating: rating}));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating isDisabled={isDisabled} onChange={handleRatingChange} rating={rating} />
      <textarea className="reviews__textarea form__textarea" id="review" value={review} name="review" placeholder="Tell how was your stay, what you like and what can be improved" minLength={ValidationMark.TEXT_MIN} maxLength={ValidationMark.TEXT_MAX} disabled={isDisabled} onChange={(evt) => setReview(evt.target.value)}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isButtonDisabled || isDisabled}>Submit</button>
      </div>
    </form>
  );
}
