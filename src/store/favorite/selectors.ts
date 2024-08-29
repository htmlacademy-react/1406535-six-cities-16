import { Offer } from '../../types';
import { State } from '../types';
import { NameSpace, RequestStatus } from '../../const';

export const getFavorite = (state: State): Offer[] => state[NameSpace.Favorite].items;
export const getFavoriteStatus = (state: State): RequestStatus => state[NameSpace.Favorite].status;
