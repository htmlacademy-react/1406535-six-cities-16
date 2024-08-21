import { Comment } from '../../types';
import Rating from '../small-elements/rating';

type ReviewItemProps = {
  review: Comment;
}

export default function ReviewItem({review}: ReviewItemProps) {
  const {rating, comment, user, date} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt={`${user.name} avatar`} />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating classPrefix="reviews" rating={rating}/>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date.slice(0, 9)}>April 2019</time>
      </div>
    </li>
  );
}
