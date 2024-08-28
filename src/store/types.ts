import { City, Offer, CompleteOffer, UserData, Review } from '../types';
import { AuthorizationStatus, RequestStatus } from '../const';
import { rootReducer } from './root-reducer';
import store from './index';

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
  items: Array<Offer | CompleteOffer>;
  status: RequestStatus;
};

export type OfferSlice = {
  info: CompleteOffer | null;
  nearby: Offer[];
  status: RequestStatus;
  reviews: Review[];
};

export type State = ReturnType<typeof store.getState>;
export type Reducer = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
