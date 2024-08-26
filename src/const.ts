import { City } from './types';

export const MAX_RATING = 5 as const;
export const RATING_ITEMS = ['perfect', 'good', 'not bad', 'badly', 'terribly'] as const;

export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    },
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    },
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    },
  }
] as City[];
export const DEFAULT_CITY = CITIES[0];

export const SortingOption = {
  Default: 'Popular',
  PriceUp: 'Price: low to high',
  PriceDown: 'Price: high to low',
  TopRated: 'Top rated first',
};

export const MarkerIcon = {
  Default: '../img/pin.svg',
  Active: '../img/pin-active.svg',
} as const;

export const MapHeight = {
  MainPage: '972px',
  OfferPage: '580px',
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

export const BACKEND_ROOT = 'https://16.design.htmlacademy.pro/six-cities' as const;
export const REQUEST_TIMEOUT = 5000 as const;
export const AUTH_TOKEN_NAME = 'six-cities-token';
export enum Endpoint {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}
