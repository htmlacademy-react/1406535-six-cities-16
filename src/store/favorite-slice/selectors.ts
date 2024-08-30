import { Offer } from '../../types';
import { State } from '../types';
import { NameSpace } from '../../const';

export const getFavorite = (state: State): Offer[] => state[NameSpace.Favorite].items;
