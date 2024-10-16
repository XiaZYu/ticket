export interface TradeInfo {
  tradeId: string;
  filmId: string;
  sessionId: number;
  seat: number;
  uid: string;
  phone: number;
  tradeDate: string;
  status: string;
  price: number;
}

export interface TradeListDetail {
  tradeId: string;
  filmName: string;
  posters: string;
  sessionName: string;
  seat: string;
  name: string;
  phone: number;
  tradeDate: string;
  status: string;
  price: number;
}
