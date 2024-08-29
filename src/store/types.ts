import { City, Offer, CompleteOffer, UserData, Review } from '../types';
import { rootReducer } from './root-reducer';
import store from './index';
import { AuthorizationStatus, RequestStatus } from '../const';

export type UserSlice = {
  info: UserData | null;
  authorizationStatus: AuthorizationStatus;
};

export type DataSlice = {
  city: City;
  offers: Offer[];
  status: RequestStatus;
};

export type FavoriteSlice = {
  items: Offer[];
  status: RequestStatus;
};

export type OfferSlice = {
  info: CompleteOffer | null;
  nearby: Offer[];
  status: RequestStatus;
  reviews: Review[];
  hasError: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type Reducer = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
