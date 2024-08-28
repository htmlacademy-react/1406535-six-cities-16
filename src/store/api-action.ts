import { Offer, AuthData, UserData, CompleteOffer, Review } from '../types';
import { AppDispatch, State } from './types';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { saveToken, dropToken } from '../services/token';
import { changeFavorite } from './data/data-slice';
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
  'FAVORITE/fetchAll',
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

export const fetchOfferAction = createAsyncThunk<CompleteOffer, {id: string}, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'DATA/fetchOneOffer',
  async ({id}, { extra: api }) => {
    const {data} = await api.get<CompleteOffer>(`${Endpoint.Offers}/${id}`);
    return data;
  },
);

export const fetchOfferNearbyAction = createAsyncThunk<Offer[], {id: string}, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'DATA/fetchOfferNearby',
  async ({id}, { extra: api }) => {
    const {data} = await api.get<Offer[]>(`${Endpoint.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchOfferCommentsAction = createAsyncThunk<Review[], {id: string}, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'DATA/fetchOfferComments',
  async ({id}, { extra: api }) => {
    const {data} = await api.get<Review[]>(`${Endpoint.Comments}/${id}`);
    return data;
  },
);

export const changeFavoriteAction = createAsyncThunk<{offer: CompleteOffer; status: 1 | 0}, {id: string; status: 1 | 0}, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'FAVORITE/changeStatus',
  async ({id, status}, { dispatch, extra: api }) => {
    const {data} = await api.post<CompleteOffer>(`${Endpoint.Favorite}/${id}/${status}`);
    dispatch(changeFavorite(data.id));
    return { offer: data, status: status };
  },
);

export const postReviewAction = createAsyncThunk<Review, {id: string; comment: string; rating: number}, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'REVIEW/postReview',
  async ({id, comment, rating}, { extra: api}) => {
    const {data} = await api.post<Review>(`${Endpoint.Comments}/${id}`, {comment, rating});
    return data;
  },
);
