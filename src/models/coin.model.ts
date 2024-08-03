export interface Coin {
  coinName: string;
}

export interface CoinDto {
  coinName: string;
}

export interface CreatePayloadWithCallback<T> {
  body: T;
  callback: any;
}

export interface CoinDtoWith {
  activeItem?: string;
}
