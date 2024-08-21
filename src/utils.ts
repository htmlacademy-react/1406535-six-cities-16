import { Offer, City, CompleteOffer } from './types';

export function capitalizeFirstLetter(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

export function convertScoreToPercent(score: number, maxScore: number) {
  return `${Math.round(score) * 100 / maxScore}%`;
}

export function sortFavoritesByCities(offers: Offer[]) {
  const sortedOffers: Record<string, Offer[]> = {};
  offers.forEach((offer) => {
    const city = offer.city.name;
    if (!Object.hasOwn(sortedOffers, city)) {
      sortedOffers[city] = [];
    }
    sortedOffers[city].push(offer);
  });
  return sortedOffers;
}

export function getCitiesArray(offers: Offer[]) {
  const cities: City[] = [];
  let city = null;

  for (const offer of offers) {
    if (offer.city.name === city) {
      continue;
    }
    cities.push(offer.city);
    city = offer.city.name;
  }
  return cities;
}

export const getPoint = (offer: Offer | CompleteOffer) => Object.assign(offer.location, {id: offer.id});
