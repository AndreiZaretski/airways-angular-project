import { createReducer, on } from '@ngrx/store';
import { IBookingPage } from 'src/app/shared/models/interface-user-booking';
import {
  StateInit, UserBookingStateInit,
} from '../state/state.model';
import {
  addOrderCart,
  deleteOrderCart,
  editOrderCart,
  getRequestUser, replaceOrderCart, updateAirsData, updateChooseChekedFrom,
  updateChooseChekedFromBack, updateChooseChekedTo, updateChooseChekedToBack,
  updateChooseData, updateIndexFrom, updateIndexTo, updateMainState,
  updateOrderCart,
  updatePassengersCount, updatePassengersInfo,
} from '../actions/state.actions';

function getIndex(array: IBookingPage[], id: string): number {
  return array.findIndex((el) => el.orderId === id);
}

function replaceElemArray(array: IBookingPage[], id: string, element: IBookingPage) {
  const index = array.findIndex((el) => el.orderId === id);
  const newArray = [...array];
  newArray.splice(index, index === -1 ? 0 : 1, element);
  return newArray;
}

function deleteElemArray(array: IBookingPage[], id: string) {
  const index = array.findIndex((el) => el.orderId === id);
  const newArray = [...array];
  newArray.splice(index, index === -1 ? 0 : 1);
  return newArray;
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

  // replase
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

  // replase
  on(
    addOrderCart,
    (state) => ({
      ...state,
      cartShoppings: [...state.cartShoppings, state.bookingPage],
    }),
  ),
  // replase
  // on(
  //   addOrderCart,
  //   (state) => ({
  //     ...state,
  //     bookingPage: {
  //       orderId: null,
  //       responseAir: null,
  //       chooseData: null,
  //       indexFrom: 0,
  //       indexTo: 0,
  //       checkedFrom: false,
  //       checkedTo: false,
  //       passengersCount: null,
  //       userPassengers: null,
  //     },
  //   }),
  // ),

  // Reducer total
  // on(
  //   addOrderCart,
  //   (state, { newOrderId }) => ({
  //     ...state,
  //     bookingPage: {
  //       orderId: null,
  //       responseAir: null,
  //       chooseData: null,
  //       indexFrom: 0,
  //       indexTo: 0,
  //       checkedFrom: false,
  //       checkedTo: false,
  //       passengersCount: null,
  //       userPassengers: null,
  //     },
  //     cartShoppings: [...state.cartShoppings, {
  //       ...state.bookingPage,
  //       orderId: newOrderId,
  //     }],
  //   }),
  // ),

  on(
    replaceOrderCart,
    (state, { OrderId }) => ({
      ...state,
      cartShoppings: replaceElemArray(state.cartShoppings, OrderId, state.bookingPage),
    }),
  ),

  on(
    deleteOrderCart,
    (state, { OrderId }) => ({
      ...state,
      cartShoppings: deleteElemArray(state.cartShoppings, OrderId),
    }),
  ),

  on(
    editOrderCart,
    (state, { OrderId }) => ({
      ...state,
      bookingPage: state.cartShoppings[getIndex(state.cartShoppings, OrderId)],
    }),
  ),

  on(
    updateOrderCart,
    (state, { newOrders }) => ({
      ...state,
      cartShoppings: newOrders,
    }),
  ),

  // updateOrderCart

);
