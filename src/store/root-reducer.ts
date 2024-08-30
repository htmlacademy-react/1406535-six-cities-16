import { combineReducers } from '@reduxjs/toolkit';
import { dataSlice } from './data-slice/data-slice';
import { userSlice } from './user-slice/user-slice';
import { favoriteSlice } from './favorite-slice/favorite-slice';
import { offerSlice } from './offer-slice/offer-slice';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Favorite]: favoriteSlice.reducer,
  [NameSpace.Offer]: offerSlice.reducer,
});
