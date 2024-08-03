import { configureStore, Tuple } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/index";
import coinSlice from "./slices/coin.slice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { coinSlice },
  middleware: () => new Tuple(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
