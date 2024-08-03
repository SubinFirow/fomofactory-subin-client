import axios, { AxiosInstance, isAxiosError } from "axios";

export interface ErrorResponse {
  message: string;
  statusCode: number;
  name: string;
}

export enum API_CLIENTS {
  COIN = "coin",
}

export const userAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-client": "fomofactory-subin-client",
  },
});

const axiosClients: { [key in API_CLIENTS]: AxiosInstance } = {
  [API_CLIENTS.COIN]: userAxiosClient,
};

export const unknownError: ErrorResponse = {
  message: "Unknown error occurred",
  name: "Unknown",
  statusCode: 500,
};

const handleErrorResponse = (error: any) => {
  if (isAxiosError(error)) {
    const errorResponse: ErrorResponse = error.response?.data ?? unknownError;
    throw errorResponse;
  } else {
    throw unknownError;
  }
};

const useAxiosClient = <T>(client: API_CLIENTS) => {
  const axiosClient = axiosClients[client];
  const post = async (url: string, params?: any) => {
    try {
      const response = await axiosClient.post<T>(url, { params });
      return response.data;
    } catch (error) {
      handleErrorResponse(error);
      throw error;
    }
  };

  return {
    post,
  };
};

export default useAxiosClient;
