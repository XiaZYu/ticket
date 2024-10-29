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


/** 修改密码 PUT /api/users/changePassword*/
export async function changePassword(body: {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}, options?: { [key: string]: any }) : Promise<API.ResponseData> {
  return request<API.ResponseData>('/api/users/changePassword', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

