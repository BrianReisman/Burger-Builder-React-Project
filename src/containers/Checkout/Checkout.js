import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  // state = {
  //   ingredients: {}, //!Changed this to {} vs. null to avoid rendering error without needing to change componentDidMount to componentWillMount
  //   price: 0,
  // };
  onCheckoutCancelled = () => {
    this.props.history.goBack(); //*we have access to this here since this component was directly rendered by a route.
  };
  onCheckoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1]; //* the + coaxes what followed to convert into a number
  //     }
  //     this.setState({ ingredients: ingredients, price: price });
  //   }
  // }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCancelled={this.onCheckoutCancelled}
            onCheckoutContinued={this.onCheckoutContinued}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients, //the burgerBuilder spcifies which reducer in the RootReducer to use
    purchased: state.order.purchased,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onInitPurhcase: ()=>dispatch(actions.purchaseInit())
//   };
// }

export default connect(mapStateToProps)(Checkout);
