export interface TradeInfo {
  tradeId: string;
  uid: string;
  filmId: string;
  sessionId: number;
  seat: number;
  filmName: string;
  posters: string;
  sessionName: string;
  attr: string;
  name: string;
  phone: number;
  tradeDate: string;
  status: string;
  price: number;
  srow: string;
  scolumn: string;
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
