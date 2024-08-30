import { CompleteOffer, Review } from '../../types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAuthStatus } from '../../store/user-slice/selectors';
import { getOfferstatus, getFullOffer, getNearby, getOfferReviews } from '../../store/offer-slice/selectors';
import { fetchOfferAction, fetchOfferNearbyAction, fetchOfferCommentsAction, changeFavoriteAction, redirectToRoute } from '../../store/api-action';
import { capitalizeFirstLetter, getPoint, sortReviewsByDate } from '../../utils';
import { MapHeight, AuthorizationStatus, RequestStatus, AppRoute } from '../../const';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import PremiumMark from '../../components/small-elements/premium-mark';
import FavoriteMark from '../../components/small-elements/favorite-mark';
import Price from '../../components/small-elements/price';
import Rating from '../../components/small-elements/rating';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import HeaderAuth from '../../components/header/header-auth';
import OfferFeaturesList from '../../components/small-elements/offer-features-list';
import OfferHostUserInfo from '../../components/small-elements/offer-host-user-info';
import NotFoundPage from '../not-found-page/not-found-page';
import Loader from '../../components/loader/loader';

const MaxItems = {
  nearOffers: 3,
  images: 6,
  reviews: 10
};

export default function OfferPage() {
  const {id} = useParams();
  const authStatus = useAppSelector(getAuthStatus);
  const isLoading = useAppSelector(getOfferstatus);
  const singleOffer = useAppSelector(getFullOffer) as CompleteOffer;
  const nearOffers = useAppSelector(getNearby).slice(0, MaxItems.nearOffers);
  const reviews = useAppSelector(getOfferReviews);
  const dispatch = useAppDispatch();
  const [sortedReviews, setSortedReviews] = useState<Review[]>([]);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    Promise.all([dispatch(fetchOfferAction({id: id as string})), dispatch(fetchOfferNearbyAction({id: id as string})), dispatch(fetchOfferCommentsAction({id: id as string}))]);
  }, [dispatch, id]);

  useEffect(() => {
    if (isLoading === RequestStatus.Success) {
      setFavorite(singleOffer.isFavorite);
    }
  }, [isLoading, singleOffer]);

  useEffect(() => {
    setSortedReviews(sortReviewsByDate(reviews));
  }, [reviews]);

  if (isLoading === RequestStatus.Loading) {
    return <Loader />;
  }

  if (isLoading === RequestStatus.Failed || !singleOffer) {
    return (<NotFoundPage />);
  }

  const {title, isPremium, rating, type, goods, bedrooms, maxAdults, price, host, description, images} = singleOffer;
  const nearPoints = nearOffers.map(getPoint);
  const activePoint = getPoint(singleOffer);
  nearPoints.push(activePoint);

  const handleFavoriteClick = () => {
    if (authStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
    }
    dispatch(changeFavoriteAction({id: singleOffer.id, status: favorite ? 0 : 1}));
    setFavorite(!favorite);
  };

  return (
    <div className="page">
      <Header>
        <HeaderAuth />
      </Header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, MaxItems.images).map((image, index) =>
                // eslint-disable-next-line react/no-array-index-key
                (<div key={index} className="offer__image-wrapper"><img className="offer__image" src={image} alt="Place image"/></div>))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <PremiumMark classPrefix="offer" />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <FavoriteMark classPrefix="offer" isFavorite={favorite} onClick={handleFavoriteClick}/>
              </div>
              <Rating classPrefix="offer" rating={rating} />
              <OfferFeaturesList type={type} bedrooms={bedrooms} maxAdults={maxAdults} />
              <Price classPrefix="offer" price={price} />
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((option, index) =>
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={index} className="offer__inside-item">{capitalizeFirstLetter(option)}</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <OfferHostUserInfo {...host} />
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={sortedReviews} count={MaxItems.reviews}/>
                {authStatus === AuthorizationStatus.Auth && <ReviewForm id={singleOffer.id} />}
              </section>
            </div>
          </div>
          <section className="offer__map map" style={{backgroundImage: 'none'}}>
            <Map points={nearPoints} activePoint={activePoint} height={MapHeight.OfferPage}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((offer) => <PlaceCard key={offer.id} classPrefix="near-places" offer={offer} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
