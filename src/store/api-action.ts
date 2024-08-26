import { Offer, AuthData, UserData } from '../types';
import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './index';
import { setAuthorization, fillOffers } from './action';
import { saveToken, dropToken } from '../services/token';
import { Endpoint, AuthorizationStatus } from '../const';

export const fetchOffersAction = createAsyncThunk<void, void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'all/fetchOffers',
  async (_, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(Endpoint.Offers);
    dispatch(fillOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/checkAuth',
  async (_, {dispatch, extra: api}) => {
    try {
      await api.get(Endpoint.Login);
      dispatch(setAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/login',
  async (body, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(Endpoint.Login, body);
    saveToken(token);
    dispatch(setAuthorization(AuthorizationStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/logout',
  async (_, {dispatch, extra: api}) => {
    await api.delete(Endpoint.Logout);
    dropToken();
    dispatch(setAuthorization(AuthorizationStatus.NoAuth));
  },
);
