import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null, //since they are being fetched form firebase
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => { //break statements are not needed since each case ends with return 
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
      case actionTypes.REMOVE_INGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
      case actionTypes.SET_INGREDIENTS:
        return{
          ...state,
          ingredients: action.ingredients, //* could write out explicity if you wanted to control the order of properties
          error: false, //*resets if error existed earlier
          totalPrice: 4,
        }
      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return{
          ...state,
          error: true,
        }
    default:
      return state;
  }
};

export default reducer;
