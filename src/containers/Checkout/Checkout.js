// import { Component } from "react";
import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';

class Checkout extends React.Component {
  state ={
    ingredients: {
      salad: 1,
      bacon: 1,
    }
  }
  render(){
    return(
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}/>
      </div>
    )
  }
}

export default Checkout;