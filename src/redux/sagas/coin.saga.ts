import { Coin, CoinDtoWith, CreatePayloadWithCallback } from "@/models";
import { CoinService } from "@/services";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchCoinFailure,
  fetchCoinRequest,
  fetchCoinSuccess,
} from "../slices";
import { ErrorResponse } from "@/api";
import { PayloadAction } from "@reduxjs/toolkit";

const { getAllCoin } = CoinService();

export function* fetchCoin(
  action: PayloadAction<CreatePayloadWithCallback<CoinDtoWith>>
) {
  try {
    const payload = action.payload.body;
    const response: Coin[] = yield call(getAllCoin, payload);
    action.payload.callback(response);
    yield put(fetchCoinSuccess(response));
  } catch (error) {
    const typedError: ErrorResponse = error as ErrorResponse;
    yield put(fetchCoinFailure(typedError.message));
  }
}

export function* watchCoin() {
  yield takeLatest(fetchCoinRequest.type, fetchCoin);
}
