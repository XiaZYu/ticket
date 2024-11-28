import { getMyTradeList } from '@/services/trade';
import { TradeInfo } from '@/types/trade';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import {ProColumns} from '@ant-design/pro-components';
import currency from 'currency.js';
import { Button, Image, message } from 'antd';
import { useRef, useState } from 'react';
import PayModel from './components/PayModel';
const TradeList = () => {
  const table = useRef<ActionType>();
  const [PayModelOpen , setModelOpen] = useState(false);
  const [tradeinfo, setTradeinfo] = useState<TradeInfo>({} as TradeInfo);

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
        return record.seatList.map(seat => (
          <div key={`${seat.srow}-${seat.scolumn}`}>
          {`${seat.srow.toString().padStart(2, '0')} 排 ${seat.scolumn.toString().padStart(2, '0')} 座 （${seat.seatType}）`}
          </div>
        ));
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
      renderText: (text) => {
        if (text === '已支付') {
          return <span className='text-green-500'>{text}</span>
        } else if (text === '未支付') {
          return <span className='text-blue-500'>{text}</span>
        } else if (text === '已取消') {
          return <span className='text-gray-500'>{text}</span>
        }else {
          return <span className='text-red-500'>{text}</span>
        }
      }
    },
    {
      title: '交易时间',
      dataIndex: 'tradeDate',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => {
       if (record.status === '未支付') {
         return <Button type='link' onClick={() => {
           setTradeinfo(record);
           setModelOpen(true);
         }}>立即支付</Button>
       } else if (record.status === '已支付') {
         return <Button type='link'>取消订单</Button>
       }

      }
    }
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
    <PayModel
      open={PayModelOpen}
      onOpenChange={setModelOpen}
      tradeinfo={tradeinfo}
      onFinish={() => {
        message.success('支付成功');
        table.current?.reload();
      }}
      />
  </PageContainer>
}

export default TradeList