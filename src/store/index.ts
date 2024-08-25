import { configureStore, combineReducers } from '@reduxjs/toolkit';
import commonReducer from './common-slice';
import { createAPI } from '../services/api';

const rootReducer = combineReducers({
  common: commonReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }),
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
