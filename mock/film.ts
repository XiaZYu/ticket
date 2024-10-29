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
  // 获取电影列表
  'GET /api/films/list': (req: Request, res: Response) => {

    const current: number = Number(req.query.current) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;
    let data = [];

    for (let i = 0; i < pageSize ; i++) {
      data.push({
        filmId: i + 1,
        filmName: Mock.mock('@ctitle'),
        filmType: Mock.mock('@ctitle'),
        // 从数组中随机选择一个元素
        language: Mock.mock('@pick(["中文", "英文"])'),
        filmDuration: Mock.mock('@integer(90, 120)'),
        price: 30,
        synopsis: Mock.mock('@cparagraph'),
        posters: Mock.mock('@image("180x240", "#aaa", "#FFF", "png", "poster")'),
        boxOffice: Mock.mock('@integer(1000, 10000)'),
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
  // 新增电影
  'POST /api/films/add': async (req: Request, res: Response) => {
    await waitTime(2000);
    res.send({
      code: 200,
      message: 'success',
      data: null,
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
