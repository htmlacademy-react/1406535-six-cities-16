import { City, Offer, CompleteOffer, UserInfo } from '../types';
import store from './index';
import { AuthorizationStatus, RequestStatus } from '../const';

export type UserSlice = {
  info: UserInfo | undefined;
  authorizationStatus: AuthorizationStatus;
};

export type DataSlice = {
  city: City;
  offers: Offer[];
  status: RequestStatus;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
