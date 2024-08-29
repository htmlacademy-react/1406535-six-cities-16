import { Offer, AuthData, UserData, CompleteOffer, Review } from '../types';
import { AppDispatch, State } from './types';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { changeFavorite } from './data/data-slice';
import { saveToken, dropToken } from '../services/token';
import { ApiRoute, AppRoute } from '../const';

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const fetchOffersAction = createAsyncThunk<Offer[], void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'offers/fetchAllOffers',
  async (_, { extra: api }) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Offers);
    return data;
  },
);

export const fetchFavoriteAction = createAsyncThunk<Offer[], void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'offers/fetchFavoriteOffers',
  async (_, { extra: api }) => {
    const {data} = await api.get<Offer[]>(ApiRoute.Favorite);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/checkAuth',
  async (_, { extra: api }) => {
    const {data} = await api.get<UserData>(ApiRoute.Login);
    return {...data, token: 'dummy-token'};
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/login',
  async (body, { dispatch, extra: api }) => {
    const {data} = await api.post<UserData>(ApiRoute.Login, body);
    saveToken(data.token);
    dispatch(fetchFavoriteAction());
    return {...data, token: 'dummy-token'};
  },
);

export const logoutAction = createAsyncThunk<void, void, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'user/logout',
  async (_, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  },
);

export const fetchOfferAction = createAsyncThunk<CompleteOffer, {id: string}, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'offer/fetchOfferById',
  async ({id}, { extra: api }) => {
    const {data} = await api.get<CompleteOffer>(`${ApiRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchOfferNearbyAction = createAsyncThunk<Offer[], {id: string}, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'offer/fetchNearby',
  async ({id}, { extra: api }) => {
    const {data} = await api.get<Offer[]>(`${ApiRoute.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchOfferCommentsAction = createAsyncThunk<Review[], {id: string}, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'offer/fetchComments',
  async ({id}, { extra: api }) => {
    const {data} = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);
    return data;
  },
);

export const changeFavoriteAction = createAsyncThunk<{offer: CompleteOffer; status: 1 | 0}, {id: string; status: 1 | 0}, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'offers/changeFavoriteStatus',
  async ({id, status}, { dispatch, extra: api }) => {
    const {data} = await api.post<CompleteOffer>(`${ApiRoute.Favorite}/${id}/${status}`);
    dispatch(changeFavorite(data.id));
    return { offer: data, status: status };
  },
);

export const postReviewAction = createAsyncThunk<Review, {id: string; comment: string; rating: number}, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(
  'offer/postReview',
  async ({id, comment, rating}, { extra: api}) => {
    const {data} = await api.post<Review>(`${ApiRoute.Comments}/${id}`, {comment, rating});
    return data;
  },
);
