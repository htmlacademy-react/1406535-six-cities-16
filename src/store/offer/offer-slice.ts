import { OfferSlice } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOfferAction, fetchOfferNearbyAction, fetchOfferCommentsAction, postReviewAction } from '../api-action';
import { NameSpace, RequestStatus } from '../../const';

const initialState: OfferSlice = {
  info: null,
  nearby: [],
  status: RequestStatus.Idle,
  reviews: [],
  hasError: false,
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.info = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchOfferCommentsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.hasError = false;
      })
      .addCase(fetchOfferNearbyAction.fulfilled, (state, action) => {
        state.nearby = action.payload;
      });
  }
});
