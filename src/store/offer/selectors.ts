import { CompleteOffer, Offer, Review } from '../../types';
import { State } from '../types';
import { NameSpace, RequestStatus } from '../../const';

export const getFullOffer = (state: State): CompleteOffer | null => state[NameSpace.Offer].info;
export const getNearby = (state: State): Offer[] => state[NameSpace.Offer].nearby;
export const getOfferReviews = (state: State): Review[] => state[NameSpace.Offer].reviews;
export const getOfferstatus = (state: State): RequestStatus => state[NameSpace.Offer].status;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Offer].hasError;
