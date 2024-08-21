import { CompleteOffer } from '../../types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter, getPoint } from '../../utils';
import { MapHeight } from '../../const';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import PremiumMark from '../../components/small-elements/premium-mark';
import FavoriteMark from '../../components/small-elements/favorite-mark';
import Price from '../../components/small-elements/price';
import Rating from '../../components/small-elements/rating';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import { OFFERS, singleOffer } from '../../mocks/offers';
import { COMMENTS } from '../../mocks/comments';

const MAX_NEAR_OFFERS = 3;

export default function OfferPage() {
  const params = useParams();

  if (params.id) {
    // eslint-disable-next-line no-console
    console.log(`Айди ${params.id}`);
  }

  const {title, isPremium, isFavorite, rating, type, goods, bedrooms, maxAdults, price, host, description, images} = singleOffer;
  const [favorite, setFavorite] = useState(isFavorite);
  const authorization = true;
  const nearOffers = OFFERS.filter((offer) => offer.city.name === 'Amsterdam').slice(0, MAX_NEAR_OFFERS);
  const nearPoints = nearOffers.map(getPoint);
  const activePoint = getPoint(singleOffer as CompleteOffer);
  nearPoints.push(activePoint);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image, index) =>
                // eslint-disable-next-line react/no-array-index-key
                (<div key={index} className="offer__image-wrapper"><img className="offer__image" src={image} alt="Place image"/></div>))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && <PremiumMark classPrefix="offer" />}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <FavoriteMark classPrefix="offer" isFavorite={favorite} onClick={() => setFavorite(!favorite)}/>
              </div>
              <Rating classPrefix="offer" rating={rating} />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(type)}</li>
                <li className="offer__feature offer__feature--bedrooms">{`${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}`}</li>
                <li className="offer__feature offer__feature--adults">{`Max ${maxAdults} adult${maxAdults > 1 ? 's' : ''}`}</li>
              </ul>
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
                <div className="offer__host-user user">
                  <div className={`${host.isPro && 'offer__avatar-wrapper--pro'} offer__avatar-wrapper user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt={host.name}/>
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={COMMENTS} />
                {authorization && <ReviewForm />}
              </section>
            </div>
          </div>
          <section className="offer__map map" style={{backgroundImage: 'none'}}>
            <Map position={singleOffer.city.location} points={nearPoints} activePoint={activePoint} height={MapHeight.offerPage}/>
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
