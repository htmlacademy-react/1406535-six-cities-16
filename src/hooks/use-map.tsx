import { Location } from '../types';
import { useEffect, useState, useRef, MutableRefObject } from 'react';
import leaflet, { Map } from 'leaflet';
import { LeafletInfo } from '../const';

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, location: Location): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
        scrollWheelZoom: false,
      });

      leaflet
        .tileLayer(LeafletInfo.URL, { attribution: LeafletInfo.Attribution, },)
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}
