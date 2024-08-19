import { useState } from 'react';
import ReviewRating from '../review-rating/review-rating';

function ReviewForm() {
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });
  // eslint-disable-next-line no-console
  console.log(formData);

  const handleTextChange = (evt: { target: { name: string; value: string } }) => {
    setFormData({...formData, review: evt.target.value});
  };

  const handleInputChange = (evt: { target: { name: string; value: string } }) => {
    setFormData({...formData, rating: Number(evt.target.value)});
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating onChange={handleInputChange} />
      <textarea className="reviews__textarea form__textarea" id="review" value={formData.review} name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleTextChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
