import { City, Offer } from '../../types';
import { useEffect, useRef } from 'react';
import { LEAFLET_ICON } from '../../const';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';

type MapProps = {
  city: City;
  offers: Offer[];
  activeOffer: Offer | null;
}

function Map({city, offers, activeOffer}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);

  const createMarker = (url: string) => leaflet.icon({
    iconUrl: url,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeOffer?.id) ? createMarker(LEAFLET_ICON.active) : createMarker(LEAFLET_ICON.default),
          })
          .addTo(map);
      });
    }
  }, [map, offers, activeOffer]);

  return (<div style={{minHeight: '794px', objectFit: 'cover'}} ref={mapRef}></div>);
}

export default Map;
