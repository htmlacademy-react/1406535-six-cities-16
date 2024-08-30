import { City, Offer } from '../../types';
import { State } from '../types';
import { NameSpace, RequestStatus } from '../../const';

export const getCity = (state: State): City => state[NameSpace.Data].city;
export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getOffersStatus = (state: State): RequestStatus => state[NameSpace.Data].status;
