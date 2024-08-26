import { Offer, City } from '../types';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { setCity, fillOffers, setAuthorization, setError, setLoadingStatus } from './action';
import { DEFAULT_CITY, AuthorizationStatus } from '../const';

type InitialState = {
  city: City;
  offers: Offer[];
  isLoading: boolean;
  authStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  isLoading: false,
  authStatus: AuthorizationStatus.Unknown,
  error: null,
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
    .addCase(setError, (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    })
    .addCase(setLoadingStatus, (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    });
});
