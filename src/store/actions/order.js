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
export const purchaseBurger = (orderData) => { //* starts the same
  return dispatch => { //*instead of return an action {}, it returns a dispatch function
    dispatch(purchaseBurgerStart()); //* before we call axios, I want to dispatch this 
    //!Just exectuing purchaseBurgerStart() would return the action *here*. Wrapping it in dispatch() makes sure the action is returned to the store
    axios
      .post("/orders.json", orderData) //adding .json is needed for firebase specifically. The path you want to send your data to
      .then((res) => {
        console.log(res.data)
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