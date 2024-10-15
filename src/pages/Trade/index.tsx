import { getTradeList } from '@/services/trade';
import { TradeInfo } from '@/types/trade';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {ProColumns} from '@ant-design/pro-components';
const TradeList = () => {
  const columns: ProColumns<TradeInfo>[] = [
    {
      title: 'ID',
      dataIndex: 'tradeId',
    },
    {
      title: '电影ID',
      dataIndex: 'filmId',
    },
    {
      title: "用户ID",
      dataIndex: 'uid',
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
        const res = await getTradeList(params)
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