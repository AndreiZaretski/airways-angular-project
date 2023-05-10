import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  airStateReducer, authReducer, mainStateReducer,
} from '../reducers/state.reduce';

export const AppState = {
  authState: authReducer,
  searchMainState: mainStateReducer,
  userBooking: airStateReducer,

};
