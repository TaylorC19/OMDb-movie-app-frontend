import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import * as cookie from "cookie";
import { ParsedUrlQuery } from "querystring";
import Cookies from "universal-cookie";
import utils from "./utils";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();
const api: AxiosInstance = axios.create({
  baseURL: process.env.BACKEND_SERVER,
});

export const getToken = async () => {
  try {
    if (typeof window === "undefined") return "";
    const access_token = cookies.get("access_token");
    if (access_token) return access_token;
    // TODO: add handle for when access_token doesn't exist in cookie
  } catch (error) {
    console.log(error);
    return null;
  }
};


const setupConfig = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const token = await getToken();
  return {
    headers: {
      Authorization: token,
    },
    ...config,
  };
};

export const get = async (
  url: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<any, any>> => {
  return api.get(url, config);
};

export const post = async (
  url: string,
  data: any = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<any, any>> => {
  return api.post(url, data, config);
};

export const put = async (
  url: string,
  data: any = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<any, any>> => {
  return api.put(url, data, config);
};

export const patch = async (
  url: string,
  data: any = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<any, any>> => {
  return api.patch(url, data, config);
};

export const remove = async (
  url: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<any, any>> => {
  return api.delete(url, config);
};

/**
 * reason I did this is to apply the token to the headers on protected api routes
 */
export const secure = {
  get: async (
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<any, any>> => {
    return api.get(url, await setupConfig(config));
  },
  post: async (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<any, any>> => {
    return api.post(url, data, await setupConfig(config));
  },
  put: async (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<any, any>> => {
    return api.put(url, data, await setupConfig(config));
  },

  patch: async (
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<any, any>> => {
    return api.patch(url, data, await setupConfig(config));
  },

  remove: async (
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<any, any>> => {
    return api.delete(url, await setupConfig(config));
  },
};
