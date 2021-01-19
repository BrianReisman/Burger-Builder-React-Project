import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {}, //!Changed this to {} vs. null to avoid rendering error without needing to change componentDidMount to componentWillMount
    price: 0,
  };
  onCheckoutCancelled = () => {
    this.props.history.goBack(); //*we have access to this here since this component was directly rendered by a route.
  };
  onCheckoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1]; //* the + coaxes what followed to convert into a number
      }
      this.setState({ ingredients: ingredients, price: price });
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.onCheckoutCancelled}
          onCheckoutContinued={this.onCheckoutContinued}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}
        />
      </div>
    );
  }
}

export default Checkout;
