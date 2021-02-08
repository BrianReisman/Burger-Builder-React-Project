import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; //Wrap everything with the Provider including BrowserRouter so that the store in Provider is supplied to all routes?
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import "./index.css";
import App from "./App";
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const rootReducer = combineReducers({ //rootReducer houses the combined reducers, it stitches them up.
  //Pass combineReducers an object with key/values where the value is your imported reducer
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer, //? "We're going to send authReducer in `on the property named auth` "
}) //*this is ultimately the one variable you pass first to createStore that now contains both/all reducers you've built.

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer); //baseline with no middleware
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));
// console.log(store)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
