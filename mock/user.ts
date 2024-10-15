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
  // 获取当前用户
  'GET /api/users/getCurrentUser': (req: Request, res: Response) => {
    const cookies = req.headers.cookie;
    const token = cookies?.split(';').find((item) => item.includes('token='))?.split('=')[1];
    if (!token) {
      res.status(401).send({
        code: 401,
        message: '请先登录',
        data: {},
      });
      return;
    }
    if (token === 'admin') {
      res.send({
        code: 200,
        data: {
          uid: '1',
          nickname: 'admin',
          name: 'admin',
          gender: '男',
          age: 20,
          phone: '13112345678',
          email: 'admin@qq.com',
          role: 'admin',
        },
      });
      return;
    }

    if (token === 'user') {
      res.send({
        code: 200,
        data: {
          uid: '2',
          nickname: 'user',
          name: 'user',
          gender: "男",
          age: 20,
          phone: '13112345678',
          email: 'user@qq.com',
          role: 'user',
        }
      })
      return;
    }

    res.status(401).send({
      code: 401,
      message: '请先登录',
      data: {},
    });
    return;
    
  },
  // 获取用户列表
  'GET /api/users/list':async (req :Request, res: Response,u :string) =>{
    const {current = 1, pageSize = 10, name = "", nickname= "", phone= ""} = req.query
    const data = Mock.mock({
      'data|10': [
        {
          'uid|+1': 1,
          name: '@cname',
          nickname: '@cname',
          phone: /^1[385][1-9]\d{8}/,
          email: '@EMAIL',
          'age|11-99': 1,
          'gender|1': ['男', '女'],
        },
      ],
    }).data;


    res.send({
      code: 200,
      message: 'success',
      data: {
        count: 100,
        current: Number(current) || 1,
        pageSize: Number(pageSize) || 10,
        users: data,
      }
    });
  }
, // 用户登录
  'POST /api/users/login': async (req: Request, res: Response) => {
    const { password, nickname } = req.body;
    await waitTime(2000);
    if (password === '123456' && nickname === 'admin') {
    
      res.send({
        code: 200,
        message: '登录成功',
        data: {
          token: 'admin',
          userId: 1,
          name: 'admin'
        }
      });
      return;
    }

    if (password === '123456' && nickname === 'user') {
      res.send({
        code: 200,
        message: '登录成功',
        data: {
          token: 'user',
          userId: 2,
          name: 'user'
        }
      });
      return;
    }
   
    res.send({
      code: 400,
      message: '用户名或密码错误',
      data: {}
    });
  },
  // 新增用户
  'POST /api/users/add': async (req: Request, res: Response) => {
    const { name, nickname, phone, email, age } = req.body;
    await waitTime(2000);
    res.send({
      code: 200,
      message: 'success',
      data: {
        id: 1,
        name,
        nickname,
        phone,
        email,
        age
      }
    });
  },
  // 删除用户
  'DELETE /api/users/delete/:id': async (req: Request, res: Response) => {
    const { id } = req.params;
    await waitTime(2000);
    res.send({
      code: 200,
      message: 'success',
      data: {
        id,
      }
    });
  },
  // 修改用户
  'PUT /api/users/update': async (req: Request, res: Response) => {
    const { uid, name, nickname, phone, email, age } = req.body;
    await waitTime(2000);
    res.send({
      code: 200,
      message: 'success',
      data: null
    });
  },
};
