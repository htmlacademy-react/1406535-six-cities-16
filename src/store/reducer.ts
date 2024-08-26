import { Offer, City } from '../types';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { setCity, fillOffers, setAuthorization } from './action';
import { DEFAULT_CITY, AuthorizationStatus } from '../const';

const initialState = {
  city: DEFAULT_CITY,
  offers: [] as Offer[],
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
    });
});
