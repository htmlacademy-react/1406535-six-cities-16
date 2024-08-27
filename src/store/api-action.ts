import { Offer, AuthData, UserData } from '../types';
import { AppDispatch, State } from './types';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { saveToken, dropToken } from '../services/token';
import { Endpoint, AppRoute } from '../const';

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const fetchOffersAction = createAsyncThunk<Offer[], void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'DATA/fetchOffers',
  async (_, { extra: api }) => {
    const {data} = await api.get<Offer[]>(Endpoint.Offers);
    return data;
  },
);

export const fetchFavoriteAction = createAsyncThunk<Offer[], void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'DATA/fetchFavorite',
  async (_, { extra: api }) => {
    const {data} = await api.get<Offer[]>(Endpoint.Favorite);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'USER/checkAuth',
  async (_, { extra: api }) => {
    const {data} = await api.get<UserData>(Endpoint.Login);
    return {...data, token: 'dummy-token'};
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'USER/login',
  async (body, { dispatch, extra: api }) => {
    const {data} = await api.post<UserData>(Endpoint.Login, body);
    saveToken(data.token);
    dispatch(fetchFavoriteAction());
    return {...data, token: 'dummy-token'};
  },
);

export const logoutAction = createAsyncThunk<void, void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'USER/logout',
  async (_, { extra: api }) => {
    await api.delete(Endpoint.Logout);
    dropToken();
  },
);
