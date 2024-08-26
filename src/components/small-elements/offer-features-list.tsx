import { getNumeralEnding, capitalizeFirstLetter } from '../../utils';
type OfferFeaturesListProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
}

export default function OfferFeaturesList({type, bedrooms, maxAdults}: OfferFeaturesListProps) {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{capitalizeFirstLetter(type)}</li>
      <li className="offer__feature offer__feature--bedrooms">{getNumeralEnding(bedrooms, 'bedroom')}</li>
      <li className="offer__feature offer__feature--adults">Max {getNumeralEnding(maxAdults, 'adult')}</li>
    </ul>
  );
}
