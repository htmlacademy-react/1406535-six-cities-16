import { Review } from '../../types';
import ReviewItem from './review-item';

type ReviewsListProps = {
  reviews: Review[];
}

export default function ReviewsList({reviews}: ReviewsListProps) {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews?.length || 0}</span></h2>
      <ul className="reviews__list">{reviews.map((review, index) =>
        // eslint-disable-next-line react/no-array-index-key
        <ReviewItem key={index} {...review} />)}
      </ul>
    </>
  );
}
