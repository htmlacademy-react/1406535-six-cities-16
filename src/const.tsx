export const MAX_RATING = 5;
export const RATING_ITEMS = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

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
