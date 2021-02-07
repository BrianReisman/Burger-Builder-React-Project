import * as actionTypes from "../actions/actionTypes";

const initState = {
  orders: [],
  loading: false, //sets to true once we start loading
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = { //*<<<<< notice within a case before the return you can use JS 
        ...action.orderData,
        id: action.orderId
      }
      return {
        ...state,
        loading: false,
        orders: [...state.orders.concat(newOrder)] //* .concat() returns a new array and therefore doesn't mutate state and can be used in reducer
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;