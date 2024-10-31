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
        tradeId: Mock.mock('@guid'),
        uid: Mock.mock('@guid'),
        filmId: Mock.mock('@guid'),
        hallId: Mock.mock('@guid'),
        seat: Mock.mock("@guid"),
        sessionId: Mock.mock('@guid'),
        time: Mock.mock('@datetime'),
        filmName: Mock.mock('@ctitle'),
        posters: Mock.mock('@image'),
        hallName: Mock.mock('@ctitle'),
        attr: Mock.mock('@pick(["3D", "2D"])'),
        name: Mock.mock('@cname'),
        phone: Mock.mock(/1[3456789][0-9]{9}/),
        tradeDate: Mock.mock('@datetime'),
        status: Mock.mock('@pick(["已支付", "未支付"])'),
        price: Mock.mock('@integer(30, 100)'),
        scolumn: Mock.mock('@integer(1, 10)'),
        srow: Mock.mock('@integer(1, 10)'),
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
        tradeId: Mock.mock('@guid'),
        uid: Mock.mock('@guid'),
        filmId: Mock.mock('@guid'),
        hallId: Mock.mock('@guid'),
        seat: Mock.mock("@guid"),
        sessionId: Mock.mock('@guid'),
        time: Mock.mock('@datetime'),
        filmName: Mock.mock('@ctitle'),
        posters: Mock.mock('@image'),
        hallName: Mock.mock('@ctitle'),
        attr: Mock.mock('@pick(["3D", "2D"])'),
        name: Mock.mock('@cname'),
        phone: Mock.mock(/1[3456789][0-9]{9}/),
        tradeDate: Mock.mock('@datetime'),
        status: Mock.mock('@pick(["已支付", "未支付"])'),
        price: Mock.mock('@integer(30, 100)'),
        scolumn: Mock.mock('@integer(1, 10)'),
        srow: Mock.mock('@integer(1, 10)'),
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
