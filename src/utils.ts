import { Offer } from './types';

function capitalizeFirstLetter(word: string) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

function convertScoreToPercent(score: number, maxScore: number) {
  return `${Math.round(score) * 100 / maxScore}%`;
}

function sortFavoritesByCities(offers: Offer[]) {
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

export { capitalizeFirstLetter, convertScoreToPercent, sortFavoritesByCities };
