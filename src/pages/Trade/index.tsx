import { getMyTradeList } from '@/services/trade';
import { TradeInfo } from '@/types/trade';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {ProColumns} from '@ant-design/pro-components';
import currency from 'currency.js';
import { Image } from 'antd';
const TradeList = () => {
  const columns: ProColumns<TradeInfo>[] = [
    {
      title: '影片',
      dataIndex: 'tradeId',
      width: 360,
      render: (text, record) => {
        return (
          <div className='flex gap-2'>
            <div>
              <Image src={record.posters} width={50} height={72} className='object-cover'/>
            </div>
            <div>
            <div className='font-bold text-lg'>{record.filmName}</div>
            <div>{record.time}</div>
            <div className='text-xs text-zinc-400'>{record.tradeId}</div>
            </div>
          </div>
        )
      }
    },
    {
      title: '影厅',
      dataIndex: 'hallName',
    },
    {
      title: '座位',
      render: (text, record) => {
        return `${record.srow}排${record.scolumn}列 (${record.attr})`
      }
    },
    
    {
      title: '交易金额',
      dataIndex: 'price',
      renderText: (text) => (
        <div className='flex items-end gap-1 '>
          <span className='text-lg text-orange-500 font-bold leading-5'>{currency(text).toString()}</span>
          <span className='text-zinc-500 text-xs'>元</span>

        </div>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '交易时间',
      dataIndex: 'tradeDate',
    },
  ]


  return <PageContainer>

    <ProTable 
      rowKey="tradeId"
      columns={columns}
      search={false}
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