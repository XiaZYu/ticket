export interface TradeInfo {
  tradeId: string;
  uid: string;
  filmId: string;
  hallId: number;
  filmName: string;
  posters: string;
  hallName: string;
  seatList: TradeSeat[];
  name: string;
  phone: number;
  tradeDate: string;
  status: string;
  price: number;
  time: string;
}

export interface TradeSeat {
  seat: string
  srow: number;
  scolumn: number;
  seatType: string;
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
