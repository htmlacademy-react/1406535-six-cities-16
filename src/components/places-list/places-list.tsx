import { Offer } from '../../types';
import PlaceCard from '../../components/place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
  onHover: (offer?: Offer) => void;
}

export default function PlacesList({offers, onHover}: PlacesListProps) {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard key={offer.id} classPrefix="cities" offer={offer} onHover={onHover} />)}
    </div>
  );
}
