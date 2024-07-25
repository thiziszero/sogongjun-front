import axios, { AxiosResponse } from "axios";
import {
  RegisterRequest,
  LoginRequest,
  QuestionRequest,
  AnswerToImageRequest,
  CreateNFTRequest
} from "../Interfaces/request";

import {
  RegisterResponse,
  LoginResponse,
  QuestionResponse,
  AnswerToImageResponse,
  CreateNFTResponse,
  NFTDetailResponse,
  NFTListResponse,
  PopularNFTResponse
} from "../Interfaces/response";

// Axios 인스턴스 생성 - User 관련 API
const userApiInstance = axios.create({
  baseURL: process.env.REACT_APP_USER_BASEURL,
});

// Axios 인스턴스 생성 - NFT 관련 API
const nftApiInstance = axios.create({
  baseURL: process.env.REACT_APP_NFT_BASEURL,
});

// 인증 토큰을 요청 헤더에 추가하는 인터셉터 - User API
userApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 인증 토큰을 요청 헤더에 추가하는 인터셉터 - NFT API
nftApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const userApi = {
  register: async (
    request: RegisterRequest
  ): Promise<AxiosResponse<RegisterResponse>> => {
    return userApiInstance.post("/api/users/register", request);
  },

  login: async (
    request: LoginRequest
  ): Promise<AxiosResponse<LoginResponse>> => {
    return userApiInstance.post("/api/users/login", request);
  },
};

export const questionApi = {
  askQuestion: async (
    request: QuestionRequest
  ): Promise<AxiosResponse<QuestionResponse>> => {
    return userApiInstance.post("/api/questions", request);
  },

  convertAnswerToImage: async (
    request: AnswerToImageRequest
  ): Promise<AxiosResponse<AnswerToImageResponse>> => {
    return userApiInstance.post(`/api/image`, request);
  },
};

export const nftApi = {
  createNFT: async (
    request: CreateNFTRequest
  ): Promise<AxiosResponse<CreateNFTResponse>> => {
    return nftApiInstance.post(`/api/nfts/${request.questionId}`, request);
  },

  getNFTDetail: async (
    tokenId: string
  ): Promise<AxiosResponse<NFTDetailResponse>> => {
    return nftApiInstance.get(`/api/nfts/${tokenId}`);
  },

  getNFTList: async (): Promise<AxiosResponse<NFTListResponse>> => {
    return nftApiInstance.get(`/api/questions/nfts`);
  },

  getNFTPopularList: async (): Promise<AxiosResponse<PopularNFTResponse>> => {
    return nftApiInstance.get(`/api/top3-nft`);
  }
};
