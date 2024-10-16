import { Area, Seat } from "@/types/seat";
import { nanoid } from "nanoid";

const DEFAULT_SEAT_SIZE = 20;
const DETAULT_SEAT_GAP = 4;

export function createCircleSeat(row: number, col: number, status: number) {
  const x = col * (DEFAULT_SEAT_SIZE + DETAULT_SEAT_GAP) + DETAULT_SEAT_GAP + DEFAULT_SEAT_SIZE / 2;
  const y = row * (DEFAULT_SEAT_SIZE + DETAULT_SEAT_GAP) + DETAULT_SEAT_GAP + DEFAULT_SEAT_SIZE / 2;

  const seat: Seat = {
    id: nanoid(),
    x,
    y,
    width: DEFAULT_SEAT_SIZE,
    height: DEFAULT_SEAT_SIZE,
    type: 'circle',
    row,
    col,
    status,
  };

  return seat;
}

export function createArea(options: {
  cols: number;
  rows: number;
  name: string;
}): Area {
  const { cols, rows, name } = options;
  const width = DEFAULT_SEAT_SIZE * cols + (cols + 1) * DETAULT_SEAT_GAP;
  const height = DEFAULT_SEAT_SIZE * rows + (rows + 1) * DETAULT_SEAT_GAP;

  const seats = Array.from({ length: rows * cols }, (_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    return createCircleSeat(row, col, 0);
  });

  const area = {
    id: nanoid(),
    name,
    x: 0,
    y: 0,
    width,
    height,
    type: 'area',
    rows,
    cols,
    seats,
    showName: true,
  };

  seats.forEach((seat) => {
    seat.area = area;
  });
  return area;
}
  
