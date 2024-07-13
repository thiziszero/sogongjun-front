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
  NFTListResponse
} from "../Interfaces/response";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

// 인증 토큰을 요청 헤더에 추가하는 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const userApi = {
  register: async (
    request: RegisterRequest
  ): Promise<AxiosResponse<RegisterResponse>> => {
    return api.post("/api/users/register", request);
  },

  login: async (
    request: LoginRequest
  ): Promise<AxiosResponse<LoginResponse>> => {
    return api.post("/api/users/login", request);
  },
};

export const questionApi = {
  askQuestion: async (
    request: QuestionRequest
  ): Promise<AxiosResponse<QuestionResponse>> => {
    return api.post("/api/questions", request);
  },

  convertAnswerToImage: async (
    request: AnswerToImageRequest
  ): Promise<AxiosResponse<AnswerToImageResponse>> => {
    return api.post(`/api/image`, request);
  },
};

export const nftApi = {
  createNFT: async (
    request: CreateNFTRequest
  ): Promise<AxiosResponse<CreateNFTResponse>> => {
    return api.post(`/api/nfts/${request.questionId}`, request);
  },

  getNFTDetail: async (
    tokenId: string
  ): Promise<AxiosResponse<NFTDetailResponse>> => {
    return api.get(`/api/nfts/${tokenId}`);
  },

  getNFTList: async (): Promise<AxiosResponse<NFTListResponse>> => {
    return api.get(`/api/questions/nfts`);
  },
};