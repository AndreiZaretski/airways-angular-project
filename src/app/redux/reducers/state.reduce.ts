import { createReducer, on } from '@ngrx/store';
import { IBookingPage } from 'src/app/shared/models/interface-user-booking';
import {
  StateInit, UserBookingStateInit,
} from '../state/state.model';
import {
  addOrderCart,
  getRequestUser, replaceOrderCart, updateAirsData, updateChooseChekedFrom,
  updateChooseChekedFromBack, updateChooseChekedTo, updateChooseChekedToBack,
  updateChooseData, updateIndexFrom, updateIndexTo, updateMainState,
  updatePassengersCount, updatePassengersInfo,
} from '../actions/state.actions';

// function getIndex(array: IBookingPage[], id: string): number {
//   return array.findIndex((el) => el.orderId === id);
// }

function replaceElemArray(array: IBookingPage[], id: string, element: IBookingPage) {
  const index = array.findIndex((el) => el.orderId === id);
  return [...array].splice(index, index === -1 ? 0 : 1, element);
}

export const authReducer = createReducer(
  StateInit,
  on(
    getRequestUser,
    (state, { currentUser }) => ({
      ...state,
      authState: currentUser,
    }),
  ),
);

export const mainStateReducer = createReducer(
  StateInit,
  on(
    updateMainState,
    (state, { newSearchForm, newPassengerOptions }) => ({
      ...state,
      searchMainState: {
        searchForm: newSearchForm,
        passengerOptions: newPassengerOptions,
      },
    }),
  ),
);

export const airStateReducer = createReducer(
  UserBookingStateInit,
  on(
    updateAirsData,
    (state, { newAirsData }) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        responseAir: newAirsData,
      },

    }),
  ),
  on(
    updatePassengersCount,
    (state, { newPassengersCount }) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        passengersCount: newPassengersCount,
      },

    }),
  ),
  on(
    updateChooseData,
    (state, { newChooseData }) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        chooseData: newChooseData,
      },

    }),
  ),

  on(
    updateIndexFrom,
    (state, { newIndexFrom }) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        indexFrom: newIndexFrom,
      },
    }),
  ),

  on(
    updateIndexTo,
    (state, { newIndexTo }) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        indexTo: newIndexTo,
      },
    }),
  ),

  on(
    updateChooseChekedFrom,
    (state) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        checkedFrom: true,
      },
    }),
  ),

  on(
    updateChooseChekedTo,
    (state) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        checkedTo: true,
      },

    }),
  ),

  on(
    updateChooseChekedFromBack,
    (state) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        checkedFrom: false,
      },

    }),
  ),

  on(
    updateChooseChekedToBack,
    (state) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        checkedTo: false,
      },
    }),
  ),

  on(
    updatePassengersInfo,
    (state, { newPassengersInfo }) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        userPassengers: newPassengersInfo,
      },
    }),
  ),
  on(
    addOrderCart,
    (state, { newOrderId }) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        orderId: newOrderId,
      },
    }),
  ),

  on(
    addOrderCart,
    (state) => ({
      ...state,
      cartShoppings: [...state.cartShoppings, state.bookingPage],
    }),
  ),

  // on(
  //   addOrderCart,
  //   (state) => ({
  //     ...state,
  //     bookingPage: {
  //       orderId: null,
  //       responseAir: null,
  //       chooseData: null,
  //       checkedFrom: false,
  //       checkedTo: false,
  //       passengersCount: null,
  //       userPassengers: null,
  //     },
  //   }),
  // ),

  on(
    replaceOrderCart,
    (state, { OrderId }) => ({
      ...state,
      cartShoppings: [...replaceElemArray(state.cartShoppings, OrderId, state.bookingPage)],
    }),
  ),

);

// [...state.cartShoppings]
//   .splice(getIndex(state.cartShoppings, OrderId), 1, state.bookingPage),
// cartShoppings[getIndex(state.cartShoppings, OrderId)] = state.bookingPage

// export const cartsDataStateReducer = createReducer(
//   // appStateInit,
//   UserBookingStateInit,
//   on(
//     addOrderCart,
//     (state) => ({
//       ...state,
//       cartShoppings: [...state.cartShoppings, state.bookingPage],
//     }),
//   ),
// );
