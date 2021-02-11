import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//synch action. Created in scope of the thunk/asynch action
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  }
}

//synch
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => { //no argument needed, hey you, trigger that thing you do. When there is no argument in an action factory it always do the same thing...?
  return {type: actionTypes.PURCHASE_BURGER_START}
}

//*asynch - call this one action, and conditionally dispatch ___success or ___fail based on axios call
//!Note, asynch code does not return an action..?
export const purchaseBurger = (orderData, token) => { //* starts the same
  return dispatch => { //*instead of return an action {}, it returns a dispatch function
    dispatch(purchaseBurgerStart()); //* before we call axios, I want to dispatch this 
    //!Just exectuing purchaseBurgerStart() would return the action *here*. Wrapping it in dispatch() makes sure the action is returned to the store
    axios
      .post("/orders.json?auth=" + token, orderData) //adding .json is needed for firebase specifically. The path you want to send your data to
      .then((res) => {
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err))
      });
  }
}

export const purchaseInit = () => {
  return {type: actionTypes.PURCHASE_INIT}
}




export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}
export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  }
}
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

//*async because 1. axios. Also it's a action compound
export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const fetchedOrders = []; //! Transform data here, not in the reducer.
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  }
}