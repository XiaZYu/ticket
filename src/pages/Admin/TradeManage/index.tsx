import { getTradeList} from '@/services/trade';
import { TradeInfo } from '@/types/trade';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {ProColumns} from '@ant-design/pro-components';
import currency from "currency.js";
const TradeList = () => {
  const columns: ProColumns<TradeInfo>[] = [
    {
      title: 'id',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '电影',
      dataIndex: 'filmName',
    },
    {
      title: "用户",
      dataIndex: 'name',
    },
    {
      title: '影厅',
      dataIndex: 'sessionName',
      search: false
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '座位',
      dataIndex: 'attr',
      search: false,
      render:(_, record) =>{
        return `${record.srow} 排 ${record.scolumn} 座 （${record.attr}）`
      }
    },
    {
      title: '交易金额',
      dataIndex: 'price',
      search: false,
      renderText:text => `${currency(text)} 元`
    },
    {
      title: '支付状态',
      dataIndex: 'status',
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
      pagination={{ pageSize: 10}}
      cardBordered
      request={async (params) => {
        const res = await getTradeList(params)
        console.log(res)
        return {
          data: res.data.list ?? [],
          success: res.code === 200,
          total: res.data.count
        }
      }
    } />
  </PageContainer>
}

export default TradeList
