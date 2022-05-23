import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import createSagaMiddleWare from "redux-saga";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleWare();
//Enable Redux tool for chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

//Run the saga middleware
sagaMiddleware.run(rootSaga);
export default store;
