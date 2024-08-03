import { Coin, CoinDtoWith, CreatePayloadWithCallback } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  coin: Coin[];
  success?: boolean;
  error?: string | null;
}

const initialState: State = {
  coin: [],
  success: false,
  error: null,
};

const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    fetchCoinRequest: (
      _state: State,
      _action: PayloadAction<CreatePayloadWithCallback<CoinDtoWith>>
    ) => {},
    fetchCoinSuccess: (state: State, action: PayloadAction<Coin[]>) => {
      state.success = true;
      state.coin = action.payload;
    },
    fetchCoinFailure: (state: State, action: PayloadAction<string>) => {
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCoinRequest, fetchCoinSuccess, fetchCoinFailure } =
  coinSlice.actions;
export default coinSlice.reducer;
