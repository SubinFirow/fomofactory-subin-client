import useAxiosClient, { API_CLIENTS } from "@/api";
import { API } from "@/api/api.contraints";
import { Coin, CoinDtoWith } from "@/models";

export const CoinService = () => {
  const api = useAxiosClient(API_CLIENTS.COIN);

  const getAllCoin = async (body: CoinDtoWith): Promise<Coin[]> => {
    const response = await api.post(API.COIN, body);

    return response as Coin[];
  };

  return {
    getAllCoin,
  };
};
