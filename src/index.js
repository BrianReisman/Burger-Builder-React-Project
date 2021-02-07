import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; //Wrap everything with the Provider including BrowserRouter so that the store in Provider is supplied to all routes?
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import "./index.css";
import App from "./App";
import burgerBuilderReducer from './store/reducers/burgerBuilder';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer); //baseline with no middleware
const store = createStore(burgerBuilderReducer, composeEnhancers(
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
