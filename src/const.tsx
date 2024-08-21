export const MAX_RATING = 5 as const;

export const RATING_ITEMS = ['perfect', 'good', 'not bad', 'badly', 'terribly'] as const;

export const PARIS = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
} as const;

export const MarkerIcon = {
  default: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  active: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
} as const;

export const MapHeight = {
  mainPage: '972px',
  offerPage: '580px',
} as const;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
