import { convertScoreToPercent } from '../../utils';
import { MAX_RATING} from '../../const';

type RatingProps = {
  classPrefix: 'place-card' | 'offer' | 'reviews';
  rating: number;
}

export default function Rating({classPrefix, rating}: RatingProps) {
  return (
    <div className={`${classPrefix}__rating rating`}>
      <div className={`${classPrefix}__stars rating__stars`}>
        <span style={{width: convertScoreToPercent(rating, MAX_RATING)}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {classPrefix === 'offer' && <span className="offer__rating-value rating__value">{rating}</span>}
    </div>
  );
}
