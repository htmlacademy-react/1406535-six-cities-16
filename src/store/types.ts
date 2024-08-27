import { City, Offer, CompleteOffer, UserData } from '../types';
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
  items: Offer[];
  status: RequestStatus;
};

export type State = ReturnType<typeof store.getState>;
export type Reducer = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
