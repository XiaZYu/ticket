import { TradeInfo } from "@/types/trade";
import { request } from "@umijs/max";

/** 获取交易列表 GET /api/trade/list */
export async function getTradeList(params: { current?: number; pageSize?: number; uid?: string; filmId?: string; sessionId?: string; }, options?: { [key: string]: any }): Promise<API.ResponsePageData<TradeInfo>> {
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
  tradeId?: string;
  filmId?: string;
  price?: number;
  seat?: string;
  sessionId?: string;
  status?: string;
  hallId?: string;
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
export async function getMyTradeList(params: { current?: number; pageSize?: number; }, options?: { [key: string]: any }): Promise<API.ResponsePageData<TradeInfo>> {
  return request('/api/trade/my-list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 支付订单 */
export async function payTrade(
  params: {
    tradeId?: string;
    uid?: string;
    price?: number;
  },
  options?: { [key: string]: any }) {
  return request(`/api/payments/pay`, {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}