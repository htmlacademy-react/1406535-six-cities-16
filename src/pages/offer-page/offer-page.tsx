import { CompleteOffer } from '../../types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils';
import Header from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import PremiumMark from '../../components/small-elements/premium-mark';
import FavoriteMark from '../../components/small-elements/favorite-mark';
import Price from '../../components/small-elements/price';
import Rating from '../../components/small-elements/rating';
import ReviewForm from '../../components/review-form/review-form';
import { OFFERS, singleOffer } from '../../mocks/offers';

function OfferPage() {
  // const params = useParams();
  // if (params.id) {
  //   console.log(`Айди ${params.id}`);
  // }

  const {title, isPremium, isFavorite, rating, type, goods, bedrooms, maxAdults, price, host, description, images} = singleOffer;
  const [favorite, setFavorite] = useState(isFavorite);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image, index) => <div key={index} className="offer__image-wrapper"><img className="offer__image" src={image} alt="Place image"/></div>)}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ? <PremiumMark classPrefix="offer" /> : null}
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
                  {goods.map((option, index) => <li key={index} className="offer__inside-item">{capitalizeFirstLetter(option)}</li>)}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`${host.isPro ? 'offer__avatar-wrapper--pro' : null} offer__avatar-wrapper user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt={host.name}/>
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro ? <span className="offer__user-status">Pro</span> : null}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ul className="reviews__list">
                  <li className="reviews__item">
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar"/>
                      </div>
                      <span className="reviews__user-name">
                        Max
                      </span>
                    </div>
                    <div className="reviews__info">
                      <div className="reviews__rating rating">
                        <div className="reviews__stars rating__stars">
                          <span style={{width: '80%'}}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <p className="reviews__text">
                        A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                      </p>
                      <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
                    </div>
                  </li>
                </ul>
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlaceCard offer={OFFERS[0]} classPrefix="near-places" />
              <PlaceCard offer={OFFERS[1]} classPrefix="near-places" />
              <PlaceCard offer={OFFERS[2]} classPrefix="near-places" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
