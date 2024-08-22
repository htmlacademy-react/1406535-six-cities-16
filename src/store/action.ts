import { City, Offer } from '../types';
import { createAction } from '@reduxjs/toolkit';

export const setCityAction = createAction<City>('setCity');
export const loadOffersAction = createAction<Offer[]>('loadOffers');
