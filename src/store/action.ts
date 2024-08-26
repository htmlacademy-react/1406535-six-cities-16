import { City, Offer } from '../types';
import { createAction } from '@reduxjs/toolkit';

export const setCity = createAction<City>('all/setCity');
export const setOffers = createAction<Offer[]>('all/setOffers');
