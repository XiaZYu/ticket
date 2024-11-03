import { useParams } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import { Result } from 'antd';
import Film from './components/Film';

// 参数护卫
function ParamsGuard(props: any) {
    const { id } = useParams();
    if (!id) {
        return <Result status="404" title="未找到该电影" />;
    }
    return props.children;
}


const FilmPage = () => {
  // 获取路由参数
  const { id } = useParams();

  return (
    <PageContainer title={false}>
      <ParamsGuard>
         {id &&  <Film id={id} />}
        </ParamsGuard>
    </PageContainer>
  );
};

export default FilmPage;


