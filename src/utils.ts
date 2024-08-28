import { Offer, CompleteOffer, Review, Point } from './types';
import dayjs from 'dayjs';
import { SortingOption } from './const';

export function capitalizeFirstLetter(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

export function convertScoreToPercent(score: number, maxScore: number) {
  return `${Math.round(score) * 100 / maxScore}%`;
}

export const getPoint = (offer: Offer | CompleteOffer) => {
  const {id, location: {latitude, longitude, zoom}} = offer;
  return ({id: id, latitude: latitude, longitude: longitude, zoom: zoom} as Point);
};

export const getNumeralEnding = (quantity: number, item: string) => `${quantity} ${item}${quantity > 1 ? 's' : ''}`;

export const sortReviewsByDate = (reviews: Review[]) => [...reviews].sort((firstReview, secondReview) => dayjs(secondReview?.date).valueOf() - dayjs(firstReview?.date).valueOf());

export const getDateYMD = (date: string) => dayjs(date).format('YYYY-MM-DD');
export const getDateMY = (date: string) => dayjs(date).format('MMMM YYYY');

export const sort = {
  [SortingOption.Default]: (offers: Offer[]) => [...offers],
  [SortingOption.PriceDown]: (offers: Offer[]) => [...offers].sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price),
  [SortingOption.PriceUp]: (offers: Offer[]) => [...offers].sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price),
  [SortingOption.TopRated]: (offers: Offer[]) => [...offers].sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating),
};
