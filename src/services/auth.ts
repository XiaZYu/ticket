// @ts-ignore
/* eslint-disable */
import { UserInfo } from '@/types/user';
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }): Promise<API.ResponseData<UserInfo>> {
  return request('/api/users/getCurrentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: {
  nickname: string;
  password: string;
}, options?: { [key: string]: any }) : Promise<API.ResponseData<UserInfo>> {
  return request<API.ResponseData<UserInfo>>('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/login/register */
export async function register(body: {
  nickname: string;
  password: string;
}, options?: { [key: string]: any }) : Promise<API.ResponseData<UserInfo>> {
  return request<API.ResponseData<UserInfo>>('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

