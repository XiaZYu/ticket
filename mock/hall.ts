import {Request, Response} from 'express';
import Mock from 'mockjs';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default {
    "GET /api/hall/list": (req: Request, res: Response) => {
        const current: number = Number(req.query.current) || 1;
        const pageSize: number = Number(req.query.pageSize) || 10;
        let data = [];

        for (let i = 0; i < pageSize; i++) {
            data.push({
                hallId: Mock.mock("@guid"),
                seats: Mock.mock("@integer(30, 50)"),
                hallName: Mock.mock("@ctitle"),
                hallDesc: Mock.mock("@pick(['标准厅', 'VIP厅', 'IMAX厅'])"),
                seatJson: null
            });
        }

        res.send({
            code: 200,
            message: 'success',
            data: {
                list: data,
                count: 100,
                page: 1,
                size: 10,
            },
        });
    },
    "POST /api/hall/createHall": async (req: Request, res: Response) => {
        await waitTime(2000);
        res.send({
            code: 200,
            message: 'success',
            data: null,
        });
    },
    "DELETE /api/hall/delete": async (req: Request, res: Response) => {
        await waitTime(2000);
        res.send({
            code: 200,
            message: 'success',
            data: null,
        });
    },
    "PUT /api/hall/modifyHall": async (req: Request, res: Response) => {
        await waitTime(2000);
        res.send({
            code: 200,
            message: 'success',
            data: null,
        });
    },
};