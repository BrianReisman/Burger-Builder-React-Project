import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux'; 

import * as actions from "../../../store/actions/index";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout(this.props.history.push());
    // this.props.onLogout(this.props.history.push()) //*one option since rendered via a route
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //name of prop + an anon function that that *calls dispatch* (from 2 lines up). Dispatch(a verb) gets passed a functions, whose return gets 'forwarded' to the reducer... into the store.
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
