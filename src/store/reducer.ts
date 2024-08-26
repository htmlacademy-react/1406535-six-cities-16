import { Offer, City } from '../types';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { setCity, setOffers } from './action';
import { DEFAULT_CITY } from '../const';

const initialState = {
  city: DEFAULT_CITY,
  offers: [] as Offer[],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    });
});
