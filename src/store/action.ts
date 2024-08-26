import { City, Offer } from '../types';
import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';

export const setCity = createAction<City>('all/setCity');
export const fillOffers = createAction<Offer[]>('all/fillOffers');
export const setAuthorization = createAction<AuthorizationStatus>('user/setAuthStatus');
export const setError = createAction<string | null>('game/setError');
export const setQuestionsDataLoadingStatus = createAction<boolean>('data/setQuestionsDataLoadingStatus');
