export interface TradeInfo {
  tradeId: string;
  uid: string;
  filmId: string;
  hallId: number;
  filmName: string;
  posters: string;
  hallName: string;
  seatList: SeatList[];
  name: string;
  phone: number;
  tradeDate: string;
  status: string;
  price: number;
  time: string;
}

interface SeatList {
  seat: string
  srow: number;
  scolumn: number;
  attr: string;
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
