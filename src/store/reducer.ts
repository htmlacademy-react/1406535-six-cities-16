import { Offer, City } from '../types';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { setCityAction, loadOffersAction } from './action';
import { DEFAULT_CITY } from '../const';

const initialState = {
  activeCity: DEFAULT_CITY,
  offers: [] as Offer[],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityAction, (state, action: PayloadAction<City>) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffersAction, (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    });
});
