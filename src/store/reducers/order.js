import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initState = {
  orders: [],
  loading: false, //sets to true once we start loading
  purchased: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    // return {
    //   ...state,
    //   purchased: false,
    // }
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });

    // return {
    //   ...state,
    //   loading: true,
    // }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.orderData, { id: action.orderId });

      // const newOrder = {
      //   //*<<<<< notice within a case before the return you can use JS
      //   ...action.orderData,
      //   id: action.orderId,
      // };

      return updateObject(state, {
        loading: false,
        purchased: true,
        orders: [...state.orders.concat(newOrder)], //* .concat() returns a new array and therefore doesn't mutate state and can be used in reducer
      });
    // return {
    //   ...state,
    //   loading: false,
    //   purchased: true,
    //   orders: [...state.orders.concat(newOrder)], //* .concat() returns a new array and therefore doesn't mutate state and can be used in reducer
    // };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });

    // return {
    //   ...state,
    //   loading: false,
    // };

    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });

    // return {
    //   ...state,
    //   loading: true,
    // };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.orders, loading: false });
    // return {
    //   ...state,
    //   orders: action.orders,
    //   loading: false,
    // };

    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });

    // return {
    //   ...state,
    //   loading: false,
    // };

    default:
      return state;
  }
};

export default reducer;
