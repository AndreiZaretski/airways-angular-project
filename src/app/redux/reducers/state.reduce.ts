import { createReducer, on } from '@ngrx/store';
import { IBookingPage } from 'src/app/shared/models/interface-user-booking';
import {
  StateInit, UserBookingStateInit,
} from '../state/state.model';
import {
  addOrderCart,
  deleteOrderCart,
  editOrderCart,
  getRequestUser, replaceOrderCart, updateAirsData, updateChooseChekedThereWay,
  updateChooseChekedThereWayEdit, updateChooseChekedBackWay, updateChooseChekedBackWayEdit,
  updateIndexThereWay, updateIndexBackWay, updateMainState,
  updateOrderCart,
  updatePassengersCount, updatePassengersInfo,
  updateUserSettingCurrency, updateUserSettingDateFormat, updateUserSettings, watchDetailsOrder,
  addToFlightsHistory,
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

  on(
    updateUserSettingCurrency,
    (state, { newCurrency }) => ({
      ...state,
      userSettings: {
        ...state.userSettings,
        currency: newCurrency,
      },
    }),
  ),

  on(
    updateUserSettingDateFormat,
    (state, { newDateFormat }) => ({
      ...state,
      userSettings: {
        ...state.userSettings,
        dateFormat: newDateFormat,
      },
    }),
  ),

  on(
    updateUserSettings,
    (state, { newSettinggs }) => ({
      ...state,
      userSettings: newSettinggs,
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
  // on(
  //   updateChooseData,
  //   (state, { newChooseData }) => ({
  //     ...state,
  //     bookingPage: {
  //       ...state.bookingPage,
  //       chooseData: newChooseData,
  //     },

  //   }),
  // ),

  on(
    updateIndexThereWay,
    (state, { newIndexThereWay }) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        indexThereWay: newIndexThereWay,
      },
    }),
  ),

  on(
    updateIndexBackWay,
    (state, { newIndexBackWay }) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        indexBackWay: newIndexBackWay,
      },
    }),
  ),

  on(
    updateChooseChekedThereWay,
    (state) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        checkedThereWay: true,
      },
    }),
  ),

  on(
    updateChooseChekedBackWay,
    (state) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        checkedBackWay: true,
      },

    }),
  ),

  on(
    updateChooseChekedThereWayEdit,
    (state) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        checkedThereWay: false,
      },

    }),
  ),

  on(
    updateChooseChekedBackWayEdit,
    (state) => ({
      ...state,
      bookingPage: {
        ...state.bookingPage,
        checkedBackWay: false,
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
    watchDetailsOrder,
    (state, { OrderId }) => ({
      ...state,
      bookingPage: {
        ...state.cartShoppings[getIndex(state.cartShoppings, OrderId)],
        orderId: null,
      },
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

  on(addToFlightsHistory, (state, { newBoughtFlights }) => ({
    ...state,
    flightsHistory: [...state.flightsHistory, ...newBoughtFlights],
  })),

  );
