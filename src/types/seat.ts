export interface Box {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    type: string;
}

export interface Seat extends Box {
    row: number;
    col: number;
    status: number;
    area?: Area
}

export interface Area extends Box {
    name: string;
    rows: number;
    cols: number;
    seats: Seat[];
    showName: boolean;
}