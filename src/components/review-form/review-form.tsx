import { FormEvent, useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getErrorStatus } from '../../store/offer/selectors';
import ReviewRating from '../review-rating/review-rating';
import { toast } from 'react-toastify';

type ReviewFormProps = {
  onSubmit: (text: string, sign: number) => void;
}

const MinValue = {
  comment: 50,
  rating: 1,
};

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

  const isDisabled = useMemo(() => !(formData.review.length >= MinValue.comment && formData.rating >= MinValue.rating), [formData]);

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
    // evt.target.reset();
    setFormData(initialValue);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onChange={handleFormChange} onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating />
      <textarea className="reviews__textarea form__textarea" id="review" defaultValue={formData.review} name="review" placeholder="Tell how was your stay, what you like and what can be improved" minLength={50} maxLength={300}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled}>Submit</button>
      </div>
    </form>
  );
}
