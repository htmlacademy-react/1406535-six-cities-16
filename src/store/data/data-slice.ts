import { DataSlice } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOffersAction } from '../api-action';
import { NameSpace, RequestStatus, DEFAULT_CITY } from '../../const';
import { City } from '../../types';

const initialState: DataSlice = {
  city: DEFAULT_CITY,
  offers: [],
  status: RequestStatus.Idle,
};

export const dataSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    changeFavorite: (state, action: PayloadAction<string>) => {
      state.offers.find((offer) => {
        if (offer.id === action.payload) {
          offer.isFavorite = !offer.isFavorite;
        }
      });
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const { setCity, changeFavorite } = dataSlice.actions;
