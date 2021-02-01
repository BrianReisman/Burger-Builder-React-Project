//synchronous action creators
import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  }
}
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  }
}
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  }
}
export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

//*asynch
export const initIngredients = () => { //no arguments expected
  return dispatch => { //*returning a function allowed by thunk
    axios
      .get('https://react-my-burger-d8ef0-default-rtdb.firebaseio.com/ingredients.json') //.json added before firebase requires it
      .then(res => {
        console.log(res.data)
        dispatch(setIngredients(res.data))
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed()) //!dispatch gets passed functions that need to be executed?
        // **if action fails dispatch a different action
          // this.setState({ error: true })
      })

  }
}