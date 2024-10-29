import { TradeInfo } from "@/types/trade";
import { request } from "@umijs/max";

/** 获取交易列表 GET /api/trade/list */
export async function getTradeList(params: { current?: number; pageSize?: number; uid?: string; filmId?: string; sessionId?: string; }, options?: { [key: string]: any }) : Promise<API.ResponsePageData<TradeInfo>> {
  return request('/api/trade/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建交易 POST /api/trade/create */
export async function createTrade(body: {
  filmId?: string;
  phone?: number;
  price?: number;
  seat?: string;
  sessionId?: string;
  status?: string;
  tradeDate?: string;
  tradeId?: string;
  uid?: string;
  [property: string]: any;
}, options?: { [key: string]: any }): Promise<API.ResponseData> {
  return request('/api/trade/create', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 修改订单 */
export async function updateTrade(body: TradeInfo, options?: { [key: string]: any }): Promise<API.ResponseData> {
  return request('/api/trade/update', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


/** 获取个人交易列表 */
export async function getMyTradeList(params: { current?: number; pageSize?: number; }, options?: { [key: string]: any }) : Promise<API.ResponsePageData<TradeInfo>> {
  return request('/api/trade/my-list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}