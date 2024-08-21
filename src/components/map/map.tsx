import { City, Point } from '../../types';
import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MarkerIcon } from '../../const';
import useMap from '../../hooks/use-map';

type MapProps = {
  position: City;
  points: Point[];
  activePoint: Point | null;
  height: string;
}

export default function Map({position, points, activePoint, height}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, position.location);

  const createMarker = (url: string) => leaflet.icon({
    iconUrl: url,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: (point.id === activePoint?.id) ? createMarker(MarkerIcon.active) : createMarker(MarkerIcon.default),
          })
          .addTo(map);
      });
    }
  }, [map, position, points, activePoint]);

  return (<div style={{height: height, maxHeight: '100%'}} ref={mapRef}></div>);
}
