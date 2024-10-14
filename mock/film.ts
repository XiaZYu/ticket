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
    const data = Mock.mock({
      'data|10': [
        {
          'filmId|+1': 1,
          filmName: '@ctitle',
          'filmType|1': ['喜剧', '动作', '爱情', '科幻'],
          'language|1': ['中文', '英文'],
          'filmDuration|90-120': 1,
          price: 30,
          synopsis: '@cparagraph',
          posters: '@image',
          'boxOffice|1-100': 1,
        },
      ],
    }).data;

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
