import { Reducer } from './types';
import { PayloadAction, Middleware } from '@reduxjs/toolkit';
import browserHistory from '../browser-history';

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
