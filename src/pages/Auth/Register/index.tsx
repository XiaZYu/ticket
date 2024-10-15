import {Footer} from '@/components';
import {
  LockOutlined, PhoneOutlined,
  UserOutlined, TeamOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {history, Helmet} from '@umijs/max';
import {Alert, message} from 'antd';
import React, {useState} from 'react';
import {createStyles} from 'antd-style';
import {ProForm, ProFormDigit} from "@ant-design/pro-components";

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
  const [userResisterState, setUserResisterState] = useState<API.LoginResult>({});
  const {styles} = useStyles();


  const handleSubmit = async (values: UserInfo) => {
    try {
      // // 登录
      // const msg = await login({...values});
      // if (msg.status === 'ok') {
      //   message.success('登录成功！');
      //   const urlParams = new URL(window.location.href).searchParams;
      //   history.push(urlParams.get('redirect') || '/');
      //   return;
      // }
      // setUserResisterState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  const {status} = userResisterState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {"注册"}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
          margin: 'auto'
        }}
      >
        <PageContainer title="开始注册">
          {status === 'error' && (
            <Alert
              showIcon
              type="error"
              style={{
                marginBottom: 20
              }}
              message={'账户或密码错误'}
            />
          )}
          <ProForm
            contentStyle={{
              minWidth: 280,
              maxWidth: '75vw',
            }}
            onFinish={async (values) => {
              await handleSubmit(values);
            }}
          >
            <ProForm.Group size="large">
              <ProFormText
                name="name"
                width="sm"
                fieldProps={{
                  prefix: <UserOutlined/>,
                }}
                placeholder={'姓名:'}
                rules={[
                  {
                    required: true,
                    message: "请输入姓名!"
                  },
                ]}
              />
              <ProFormText
                name="nickname"
                width="sm"
                fieldProps={{
                  prefix: <TeamOutlined/>,
                }}
                placeholder={'用户名:'}
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!"
                  },
                ]}
              />
            </ProForm.Group>
            <ProForm.Group size="large">
              <ProFormText
                width="sm"
                name="phone"
                fieldProps={{
                  prefix: <PhoneOutlined/>,
                }}
                placeholder={'手机号:'}
                rules={[
                  {
                    required: true,
                    message: "请输入手机号!",
                  },
                  {
                    pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message: "手机号格式错误"
                  }
                ]}
              />
              <ProFormText
                width="sm"
                name="email"
                fieldProps={{
                  prefix: <UserOutlined/>,
                }}
                placeholder={'邮箱:'}
                rules={[
                  {
                    required: true,
                    message: "请输入邮箱!"
                  },
                  {
                    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: "邮箱格式错误"
                  }
                ]}
              />
            </ProForm.Group>
            <ProForm.Group size="large">
              <ProFormSelect
                width="sm"
                name="gender"
                label="性别"
                valueEnum={{
                  '男': '男',
                  '女': '女',
                }}
                fieldProps={{
                }}
                placeholder="选择你的性别"
                rules={[{required: true, message: '选择你的性别'}]}
              />
              <ProFormDigit
                width="sm"
                label="年龄"
                name="age"
                min={18}
                max={120}
                fieldProps={{
                }}
              />
            </ProForm.Group>
            <ProForm.Group size="large">
              <ProFormText.Password
                name="password"
                width="sm"
                fieldProps={{
                  prefix: <LockOutlined/>,
                }}
                placeholder='密码:'
                rules={[
                  {
                    required: true,
                    message: "请输入密码"
                  },
                  {
                    pattern: /^(?=.*\d)(?=.*[A-z])[\da-zA-Z]{6,12}$/,
                    message: "请输入由数字和字母组成的6-12位密码"
                  },
                ]}
              />
              <ProFormText.Password
                name="passwordAgain"
                width="sm"
                fieldProps={{
                  prefix: <LockOutlined/>,
                }}
                placeholder='再次输入密码:'
                rules={[
                  {
                    required: true,
                    message: "再次输入密码"
                  },
                ]}
              />
            </ProForm.Group>
          </ProForm>
        </PageContainer>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
