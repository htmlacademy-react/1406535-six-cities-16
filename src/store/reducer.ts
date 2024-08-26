import { Offer, City } from '../types';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { setCity, fillOffers, setAuthorization, setError, setLoadingStatus } from './action';
import { DEFAULT_CITY, AuthorizationStatus } from '../const';

type error = string | null;

const initialState = {
  city: DEFAULT_CITY,
  offers: [] as Offer[],
  isLoading: false,
  authStatus: AuthorizationStatus.Unknown,
  error: null as error,
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
    .addCase(setError, (state, action: PayloadAction<error>) => {
      state.error = action.payload;
    })
    .addCase(setLoadingStatus, (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    });
});
