import { airStateReducer, authReducer, mainStateReducer } from '../reducers/state.reduce';

export const AppState = {
  authState: authReducer,
  searchMainState: mainStateReducer,
  airResponse: airStateReducer,
};
