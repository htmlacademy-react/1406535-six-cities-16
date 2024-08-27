import { Offer, AuthData, UserData, UserInfo } from '../types';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './types';
import { saveToken, dropToken } from '../services/token';
import { Endpoint } from '../const';

export const fetchOffersAction = createAsyncThunk<Offer[], void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'DATA/fetchOffers',
  async (_, { extra: api }) => {
    const {data} = await api.get<Offer[]>(Endpoint.Offers);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'USER/checkAuth',
  async (_, { extra: api }) => {
    await api.get(Endpoint.Login);
  },
);

export const loginAction = createAsyncThunk<UserInfo, AuthData, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'USER/login',
  async (body, { extra: api }) => {
    const {data} = await api.post<UserData>(Endpoint.Login, body);
    saveToken(data.token);
    delete data.token;
    return data as UserInfo;
  },
);

export const logoutAction = createAsyncThunk<void, void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'USER/logout',
  async (_, { extra: api }) => {
    await api.delete(Endpoint.Logout);
    dropToken();
  },
);
