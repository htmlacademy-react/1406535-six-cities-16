import { Offer } from '../../types';
import { useState } from 'react';
import PlaceCard from '../../components/place-card/place-card';

type PlacesListProps = {
  offers: Offer[];
}

function PlacesList({offers}: PlacesListProps) {
  const [activeCard, setActiveCard] = useState(null);

  const mouseOverHandler = (evt: Event) => {
    const activeId = evt.target.closest('.place-card')?.dataset.id || null;
    setActiveCard(activeId);
  };

  return (
    <div className="cities__places-list places__list tabs__content" onMouseOver={mouseOverHandler} onMouseLeave={() => setActiveCard(null)}>
      {offers.map((offer) => <PlaceCard key={offer.id} classPrefix="cities" offer={offer} />)}
    </div>
  );
}

export default PlacesList;
