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
export async function createTrade(body: TradeInfo, options?: { [key: string]: any }): Promise<API.ResponseData> {
  return request('/api/trade/create', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}