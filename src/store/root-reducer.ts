import { combineReducers } from '@reduxjs/toolkit';
import { dataSlice } from './data/data-slice';
import { userSlice } from './user/user-slice';
import { favoriteSlice } from './favorite/favorite-slice';
import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Favorite]: favoriteSlice.reducer,
});
