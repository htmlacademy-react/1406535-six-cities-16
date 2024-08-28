import { FavoriteSlice } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavoriteAction, changeFavoriteAction } from '../api-action';
import { NameSpace, RequestStatus } from '../../const';

const initialState: FavoriteSlice = {
  items: [],
  status: RequestStatus.Idle,
};

export const favoriteSlice = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {
    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    }
  },
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
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        const {offer, status} = action.payload;
        switch (status) {
          case 0:
            state.items = state.items.filter(({id}) => id !== offer.id);
            break;
          case 1:
            state.items.push(action.payload.offer);
        }
      });
  }
});

export const { deleteFavorite } = favoriteSlice.actions;
