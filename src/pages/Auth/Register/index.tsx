import {Footer} from '@/components';
import {
  LockOutlined, PhoneOutlined,
  UserOutlined, TeamOutlined,
  LeftOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {history, Helmet, Link} from '@umijs/max';
import {message} from 'antd';
import React from 'react';
import {createStyles} from 'antd-style';
import {ProForm, ProFormDigit} from "@ant-design/pro-components";
import { UserInfo } from '@/types/user';
import { addUser } from '@/services/users';

const useStyles = createStyles(({token}) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  } as any;
});


const Register: React.FC = () => {
  const {styles} = useStyles();


  const handleSubmit = async (values: UserInfo) => {
    try {
      // // 登录
      const res = await addUser({...values});
      if (res.code === 200) {
        message.success('注册成功！');
        history.push('/user/login');
        return;
      }
    } catch (error) {
      message.error('注册失败，请重试！');
    }
  };


  return (
    <div className={styles.container}>
      <Helmet>
        <title>{'注册'}</title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
          margin: 'auto',
        }}
      >
        <PageContainer
          title="开始注册"
          extra={
            <Link to={'/user/login'} className="text-xs">
              <LeftOutlined />
              返回登录
            </Link>
          }
        >
          <ProForm
            onFinish={handleSubmit}
            submitter={{
              searchConfig: {
                submitText: '注册',
              },
              render: (_, dom) => {
                dom.shift();
                return (
                  <div className='flex gap-2 justify-center'>
                    {dom}
                  </div>
                )
              },
              submitButtonProps: {
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
          >
            <ProForm.Group size="large">
              <ProFormText
                name="name"
                width="sm"
                fieldProps={{
                  prefix: <UserOutlined />,
                  autoComplete: 'off',
                  size: 'large',
                }}
                placeholder={'姓名:'}
                rules={[
                  {
                    required: true,
                    message: '请输入姓名!',
                  },
                ]}
              />
              <ProFormText
                name="nickname"
                width="sm"
                fieldProps={{
                  prefix: <TeamOutlined />,
                  autoComplete: 'off',
                  size: 'large',
                }}
                placeholder={'用户名:'}
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group size="large">
              <ProFormText
                width="sm"
                name="phone"
                fieldProps={{
                  prefix: <PhoneOutlined />,
                  autoComplete: 'off',
                  size: 'large',
                }}
                placeholder={'手机号:'}
                rules={[
                  {
                    required: true,
                    message: '请输入手机号!',
                  },
                  {
                    pattern:
                      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message: '手机号格式错误',
                  },
                ]}
              />
              <ProFormText
                width="sm"
                name="email"
                fieldProps={{
                  prefix: <MailOutlined />,
                  autoComplete: 'off',
                  size: 'large',
                }}
                placeholder={'邮箱:'}
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱!',
                  },
                  {
                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '邮箱格式错误',
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group size="large">
              <ProFormSelect
                width="sm"
                name="gender"
                valueEnum={{
                  男: '男',
                  女: '女',
                }}
                
                fieldProps={{
                  size: 'large',
                  prefixCls: 'ant-select',
                  
                }}
                placeholder="选择你的性别"
                rules={[{ required: true, message: '选择你的性别' }]}
              />
              <ProFormDigit
                width="sm"
                name="age"
                min={18}
                max={120}
                placeholder="请输入年龄"
                fieldProps={{
                  size: 'large',
                }}
              />
            </ProForm.Group>
            <ProForm.Group size="large">
              <ProFormText.Password
                name="password"
                width="sm"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                  autoComplete: 'off',
                }}
                placeholder="密码:"
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                  {
                    pattern: /^(?=.*\d)(?=.*[A-z])[\da-zA-Z]{6,12}$/,
                    message: '由6-12位数字和字母组成',
                  },
                ]}
              />
              <ProFormText.Password
                name="passwordAgain"
                width="sm"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="再次输入密码:"
                rules={[
                  {
                    required: true,
                    message: '再次输入密码',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次密码输入不一致!'));
                    },
                  }),
                ]}
              />
            </ProForm.Group>
          </ProForm>
        </PageContainer>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
