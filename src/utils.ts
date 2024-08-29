import { Offer, CompleteOffer, Review, Point } from './types';
import dayjs from 'dayjs';
import { SortingOption } from './const';

export const capitalizeFirstLetter = (word: string) => `${word[0].toUpperCase()}${word.slice(1)}`;

export const convertScoreToPercent = (score: number, maxScore: number) => `${Math.round(score) * 100 / maxScore}%`;

export const getPoint = (offer: Offer | CompleteOffer) => {
  const {id, location: {latitude, longitude, zoom}} = offer;
  return ({id: id, latitude: latitude, longitude: longitude, zoom: zoom} as Point);
};

export const getNumeralEnding = (quantity: number, item: string) => `${quantity} ${item}${quantity > 1 ? 's' : ''}`;

export const sortReviewsByDate = (reviews: Review[]) => [...reviews].sort((firstReview, secondReview) => dayjs(secondReview.date).valueOf() - dayjs(firstReview.date).valueOf());
export const getDateYMD = (date: string) => dayjs(date).format('YYYY-MM-DD');
export const getDateMY = (date: string) => dayjs(date).format('MMMM YYYY');

export const sort = {
  [SortingOption.Default]: (offers: Offer[]) => [...offers],
  [SortingOption.PriceDown]: (offers: Offer[]) => [...offers].sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price),
  [SortingOption.PriceUp]: (offers: Offer[]) => [...offers].sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price),
  [SortingOption.TopRated]: (offers: Offer[]) => [...offers].sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating),
};

export const sortOffersByCities = (offers: Offer[]) => {
  const sortedOffers: Record<string, Offer[]> = {};
  [...offers].forEach((offer) => {
    const city = offer.city.name;
    if (!Object.hasOwn(sortedOffers, city)) {
      sortedOffers[city] = [];
    }
    sortedOffers[city].push(offer);
  });
  return sortedOffers;
};

export const isEmptyArray = (arr?: Array<unknown>): boolean => Array.isArray(arr) && arr.length > 0;
