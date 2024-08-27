import { FavoriteSlice } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchFavoriteAction } from '../api-action';
import { NameSpace, RequestStatus } from '../../const';

const initialState: FavoriteSlice = {
  items: [],
  status: RequestStatus.Idle,
};

export const favoriteSlice = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.items = action.payload;
      })
      .addCase(fetchFavoriteAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});
