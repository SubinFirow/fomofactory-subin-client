import { all } from "redux-saga/effects";
import { watchCoin } from "./coin.saga";

export default function* watch() {
  yield all([watchCoin()]);
}
