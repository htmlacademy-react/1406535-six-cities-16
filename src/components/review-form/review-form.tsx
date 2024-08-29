import { FormEvent, useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getErrorStatus } from '../../store/offer/selectors';
import { toast } from 'react-toastify';
import ReviewRating from '../review-rating/review-rating';

type ReviewFormProps = {
  onSubmit: (text: string, sign: number) => void;
}

const CommentLength = {
  Min: 50,
  Max: 300,
} as const;

const MinValue = {
  Comment: CommentLength.Min,
  Rating: 1,
} as const;


export default function ReviewForm({onSubmit}: ReviewFormProps) {
  const hasError = useAppSelector(getErrorStatus);

  const initialValue = {
    rating: 0,
    review: '',
  };

  const [formData, setFormData] = useState(initialValue);

  if (hasError) {
    toast.warn('Проверьте данные формы и попробуйте отпрaвить еще раз.');
  }

  const isDisabled = useMemo(() => !(formData.review.length >= MinValue.Comment && formData.rating >= MinValue.Rating), [formData]);

  const handleFormChange = (evt: FormEvent) => {
    const {name, value} = evt.target as HTMLFormElement;
    switch (name) {
      case 'review':
        setFormData({...formData, review: String(value)});
        break;
      case 'rating':
        setFormData({...formData, rating: Number(value)});
    }
  };

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    onSubmit(formData.review, formData.rating);
    evt.target.reset();
    setFormData(initialValue);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onChange={handleFormChange} onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating />
      <textarea className="reviews__textarea form__textarea" id="review" defaultValue={formData.review} name="review" placeholder="Tell how was your stay, what you like and what can be improved" minLength={CommentLength.Min} maxLength={CommentLength.Max}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled}>Submit</button>
      </div>
    </form>
  );
}
