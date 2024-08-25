import { City, Offer } from '../types';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '.';
import { DEFAULT_CITY, RequestStatus, Endpoint } from '../const';

interface InitialState {
  city: City;
  offers: Offer[];
  status: RequestStatus;
}

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  status: RequestStatus.Idle,
};

export const fetchOffers = createAsyncThunk<Offer[], void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'fetchoffers/all', async (_, {extra: api}) => {
    const response = await api.get<Offer[]>(Endpoint.Offers);
    return response.data;
  });

const commonSlice = createSlice({
  extraReducers: (builder) =>
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state, action: PayloadAction<Offer[]>) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      }),
  name: 'common',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
  },
});

export const { setCity } = commonSlice.actions;
export default commonSlice.reducer;
