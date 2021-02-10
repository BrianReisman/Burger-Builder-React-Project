import React, { Component } from "react";
import {connect} from 'react-redux';

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';
import axios from "../../axios-orders";


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    // console.log(this.props);
    this.props.onInitIngredients(); //!this is also invoked.
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients) //and array of object values
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0
  }

  // addIngredientHandler = (type) => {
  //   //ingredient -
  //   const oldCount = this.state.ingredients[type]; //get the VALUE current state of this type of ingredient
  //   const updatedCount = oldCount + 1; //take that value and increase it by one.
  //   const updatedIngredients = { ...this.state.ingredients }; //make a copy of the whole slice of state.
  //   updatedIngredients[type] = updatedCount; //take the new value that had 1 added to it and apply it to the copy of state applied specifically for the appropriate ingrediant.

  //   //cost -
  //   const priceAddition = INGREDIENT_PRICES[type]; //get the price for the ingredient being handled.
  //   const oldPrice = this.state.totalPrice; //get the current total price from within state.
  //   const newPrice = oldPrice + priceAddition; //using the state and the ingredient price you grabbed add them together.

  //   //update both slices of state.
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };
  // removeIngredientHandler = (type) => {
  //   //ingredient -
  //   const oldCount = this.state.ingredients[type]; //get the VALUE current state of this type of ingredient
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1; //take that value and increase it by one.
  //   const updatedIngredients = { ...this.state.ingredients }; //make a copy of the whole slice of state.
  //   updatedIngredients[type] = updatedCount; //take the new value that had 1 added to it and apply it to the copy of state applied specifically for the appropriate ingrediant.

  //   //cost -
  //   const priceSubtraction = INGREDIENT_PRICES[type]; //get the price for the ingredient being handled.
  //   const oldPrice = this.state.totalPrice; //get the current total price from within state.
  //   const newPrice = oldPrice - priceSubtraction; //using the state and the ingredient price you grabbed add them together.

  //   //update both slices of state.
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth')
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // // alert("You continue!");
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   ); //* encodeURIComponent helps with formatting like removing white space
    // }
    // queryParams.push("price=" + this.state.totalPrice);
    // const queryString = queryParams.join("&");
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
    
  };

  render() {
    const disableInfo = {
      //1) this contains all of the ingredients' states
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0; //2)this updates the copied state objects with boolean values.
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disable={disableInfo} //3) we are now passing the state containing booleans under the name 'disable'
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  // console.log(state.ingredients)
  return {
    //*ings will be the key of this mapped state object being passed to *this* component.
    //*the value of this will be the global state.ingredients
    ings: state.burgerBuilder.ingredients, //*this state. is the parameter of this function mapStateToProps.
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error, //!we have two reducers in createStore now (see index.js), Specifying which reducer that has been combined in now drilling down to the appropriate one since there are two
    isAuthenticated: state.auth.token !== null,
  };
}

const mapDispatchToProps = (dispatch) => {
  return{
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()), //!function inside dispatch()? invoke!
    //*original version with dispatch() returning the action object.
    onInitPurchase: () => dispatch(actions.purchaseInit()),
        // onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

