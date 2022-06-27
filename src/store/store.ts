import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../redux/saga";
import rootReducer from "../redux/reducers";

/* Root Saga Middleware*/
const sagaMiddleware = createSagaMiddleware();

let middlewares = applyMiddleware(sagaMiddleware);

/* Root Store with all the combined reducers*/
const store = createStore(rootReducer, composeWithDevTools(middlewares));

/*Run the sagas*/
sagaMiddleware.run(rootSaga);

export default store;
