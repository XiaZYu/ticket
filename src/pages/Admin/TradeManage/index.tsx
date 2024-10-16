import { getMyTradeList } from '@/services/trade';
import { TradeInfo } from '@/types/trade';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {ProColumns} from '@ant-design/pro-components';
const TradeList = () => {
  const columns: ProColumns<TradeInfo>[] = [
    {
      title: '订单号',
      dataIndex: 'tradeId',
    },
    {
      title: '电影',
      dataIndex: 'filmName',
    },
    {
      title: "用户ID",
      dataIndex: 'name',
      search: false
    },
    {
      title: '交易金额',
      dataIndex: 'price',
      search: false
    },
    {
      title: '交易时间',
      dataIndex: 'tradeDate',
      search: false
    }
  ]


  return <PageContainer>

    <ProTable 
      rowKey="tradeId"
      columns={columns}
      request={async (params) => {
        const res = await getMyTradeList(params)
        return {
          data: res.data.list || [],
          success: res.code === 200,
          total: res.data.count
        }
      }
    } />
  </PageContainer>
}

export default TradeList