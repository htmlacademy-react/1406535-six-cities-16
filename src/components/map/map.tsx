import { Offer, CompleteOffer } from '../../types';
import { useEffect, useRef } from 'react';
import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { MarkerIcon } from '../../const';
import useMap from '../../hooks/use-map';

type MapProps = {
  offers: Offer[] | [];
  activePoint: Offer | CompleteOffer | null;
  height: string;
}

const createMarker = (url: string) => leaflet.icon({
  iconUrl: url,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

export default function Map({offers, activePoint, height}: MapProps) {
  const {location} = useAppSelector((state) => state.common.city);
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  }, [map, location]);

  useEffect(() => {
    if (map && offers) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activePoint?.id) ? createMarker(MarkerIcon.Active) : createMarker(MarkerIcon.Default),
          })
          .addTo(markerLayer.current);
      });
    }
  }, [map, offers, activePoint]);

  return (<div style={{height: height, maxHeight: '100%'}} ref={mapRef}></div>);
}
