import { UserData } from '../../types';
import { State } from '../types';
import { AuthorizationStatus, NameSpace } from '../../const';

export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: State): UserData | null => state[NameSpace.User].info;
