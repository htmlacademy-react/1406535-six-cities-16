import { Offer, City } from '../types';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { setCity, fillOffers, setAuthorization, setLoadingStatus } from './action';
import { DEFAULT_CITY, AuthorizationStatus } from '../const';

type InitialState = {
  city: City;
  offers: Offer[];
  isLoading: boolean;
  authStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  isLoading: false,
  authStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    })
    .addCase(setAuthorization, (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authStatus = action.payload;
    })
    .addCase(setLoadingStatus, (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    });
});
