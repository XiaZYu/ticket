export interface Box {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
}

export type SeatStatus = "enabled" | "disabled" | "selled" | "locked";

export interface Seat extends Box {
    _row: number;
    _col: number;
    status: string;
    areaId?: string;
    col?: number;
    row?: number;
    seatType: string;
}

export interface Area extends Box {
    name: string;
    rows: number;
    cols: number;
    seats: Seat[];
    showName: boolean;
}