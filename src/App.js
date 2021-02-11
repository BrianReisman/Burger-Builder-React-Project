import React, { Component } from "react";
import Layout from "./hoc/layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from './hoc/asyncComponent/asyncComponent';

//expects a function... anonymous //! Lazy loading. Makes most sense for larger files.
const asyncCheckout = asyncComponent(()=>{
  return import("./containers/Checkout/Checkout")
});
const asyncOrders = asyncComponent(()=>{
  return import("./containers/Orders/Orders")
});
const asyncAuth = asyncComponent(()=>{
  return import("./containers/Auth/Auth")
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        {/* //*If any path is unknown, not one of the above switch statements are met, all others redirect to='/' */}
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          {/* Guards in place to protect against any unknown pathnames 👇 */}
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
