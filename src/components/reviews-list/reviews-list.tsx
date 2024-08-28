import { Review } from '../../types';
import ReviewItem from './review-item';

type ReviewsListProps = {
  reviews: Review[];
  count: number;
}

export default function ReviewsList({reviews, count}: ReviewsListProps) {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews?.length || 0}</span></h2>
      <ul className="reviews__list">{reviews.length !== 0 && reviews.slice(0, count).map((review, index) =>
        // eslint-disable-next-line react/no-array-index-key
        <ReviewItem key={index} {...review} />)}
      </ul>
    </>
  );
}
