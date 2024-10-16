import {Request, Response} from 'express';
import Mock from 'mockjs';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 获取交易列表
  'GET /api/trade/list': (req: Request, res: Response) => {

    const current: number = Number(req.query.current) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;
    let data = [];

    for (let i = 0; i < pageSize ; i++) {
      data.push({
        tradeId: Mock.mock('@id'),
        filmId: Mock.mock('@id'),
        sessionId: Mock.mock('@id'),
        seat: Mock.mock('@integer(1, 100)'),
        uid: Mock.mock('@id'),
        phone: Mock.mock('@regex(1[3456789][0-9]{9})'),
        tradeDate: Mock.mock('@datetime'),
        status: Mock.mock('@integer(0, 1)'),
        price: Mock.mock('@integer(30, 100)'),
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
  // 获取个人交易列表
  'GET /api/trade/my-list': async (req: Request, res: Response) => {
    await waitTime(2000);
    const current: number = Number(req.query.current) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;
    let data = [];

    for (let i = 0; i < pageSize ; i++) {
      data.push({
        tradeId: Mock.mock('@id'),
        filmName: Mock.mock('@ctitle'),
        posters: Mock.mock('@image'),
        filmId: Mock.mock('@id'),
        uid: Mock.mock('@id'),
        name: Mock.mock('@cname'),
        sessionName: Mock.mock('@ctitle'),
        seat: Mock.mock('@integer(1, 100)'),
        phone: Mock.mock('@regex(1[3456789][0-9]{9})'),
        tradeDate: Mock.mock('@datetime'),
        status: Mock.mock('@integer(0, 1)'),
        price: Mock.mock('@integer(30, 100)'),
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
  // 删除用户
  'DELETE /api/films/delete': async (req: Request, res: Response) => {
    const { filmId } = req.params;
    await waitTime(2000);
    res.send({
      code: 200,
      message: 'success',
      data: null
    });
  },
  // 修改用户
  'PUT /api/films/update': async (req: Request, res: Response) => {
    const { uid, name, nickname, phone, email, age } = req.body;
    await waitTime(2000);
    res.send({
      code: 200,
      message: 'success',
      data: null
    });
  },
};
