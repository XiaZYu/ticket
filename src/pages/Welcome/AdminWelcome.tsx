import { ProCard } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { theme } from 'antd';
const AdminWelcome = () => {
  const { useToken } = theme;
  const { token } = useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <ProCard
      style={{
        borderRadius: 8,
      }}
      bodyStyle={{
        backgroundImage:
          initialState?.settings?.navTheme === 'realDark'
            ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
            : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
      }}
    >
      <div
        style={{
          backgroundPosition: '100% -30%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '274px auto',
          backgroundImage:
            "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
        }}
      >
        <div
          style={{
            fontSize: '20px',
            color: token.colorTextHeading,
          }}
        >
          欢迎使用 电影票务系统
        </div>
        <p
          style={{
            fontSize: '14px',
            color: token.colorTextSecondary,
            lineHeight: '22px',
            marginTop: 16,
            marginBottom: 32,
            width: '65%',
          }}
        >
          电影票务系统是一个整合了影院管理系统和观众互动模块的综合性方案。
          致力于在满足观众观影需求和影院运营管理的基础，进一步提升电影产业中观众、影院和电影发行方在票务交易及相关过程中的
          “体验” 和 “效益”。{' '}
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
          }}
        ></div>
      </div>
    </ProCard>
  );
};

export default AdminWelcome;
