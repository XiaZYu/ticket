// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ResponseData<T = null> = {
    code: number;
    message: string;
    data: T;
  }

  type ResponsePageData<T = null> = {
    code: number;
    message: string;
    data: {
      list: T[];
      count: number;
      page: number;
      size: number;
    }
  }
}
