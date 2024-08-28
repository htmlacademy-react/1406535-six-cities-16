import { State } from '../types';
import { Offer, CompleteOffer } from '../../types';
import { NameSpace, RequestStatus } from '../../const';

export const getFavorite = (state: State): Array<Offer | CompleteOffer> => state[NameSpace.Favorite].items;
export const getFavoriteStatus = (state: State): RequestStatus => state[NameSpace.Favorite].status;
