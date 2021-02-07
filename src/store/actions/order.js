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

//*asynch - call this one action, and conditionally dispatch ___success or ___fail based on axios call
export const purchaseBurgerStart = (orderData) => { //* starts the same
  return dispatch => { //*instead of return an action {}, it returns a dispatch function
    axios
      .post("/orders.json", orderData) //adding .json is needed for firebase specifically. The path you want to send your data to
      .then((res) => {
        console.log(res.data)
        dispatch(purchaseBurgerSuccess(res.data, orderData))
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err))
      });
  }
}