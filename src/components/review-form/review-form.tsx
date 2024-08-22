import { FormEvent, useState } from 'react';
import ReviewRating from '../review-rating/review-rating';

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

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

  return (
    <form className="reviews__form form" action="#" method="post" onChange={handleFormChange}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating />
      <textarea className="reviews__textarea form__textarea" id="review" defaultValue={formData.review} name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}
