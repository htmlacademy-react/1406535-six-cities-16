import { Point } from '../../types';
import { useEffect, useRef } from 'react';
import leaflet, { LayerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { MarkerIcon } from '../../const';
import useMap from '../../hooks/use-map';

type MapProps = {
  points: Point[];
  activePoint: Point | null;
  height: string;
}

const createMarker = (url: string) => leaflet.icon({
  iconUrl: url,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

export default function Map({points, activePoint, height}: MapProps) {
  const location = useAppSelector((state) => state.activeCity).location;
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
    if (map && points) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.latitude,
            lng: point.longitude,
          }, {
            icon: (point.id === activePoint?.id) ? createMarker(MarkerIcon.Active) : createMarker(MarkerIcon.Default),
          })
          .addTo(markerLayer.current);
      });
    }
  }, [map, points, activePoint]);

  return (<div style={{height: height, maxHeight: '100%'}} ref={mapRef}></div>);
}
