import { State } from '../types';
import { AuthorizationStatus, NameSpace } from '../../const';

export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.Data].authorizationStatus;
