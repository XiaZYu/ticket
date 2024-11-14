import { getTradeList} from '@/services/trade';
import { TradeInfo } from '@/types/trade';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {ProColumns} from '@ant-design/pro-components';
import currency from "currency.js";
import UpdateTradeModal from './components/UpdateTradeModal';
import { useState } from 'react';
const TradeList = () => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentTrade, setCurrentTrade] = useState<TradeInfo | undefined>(undefined);

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
      dataIndex: 'hallName',
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
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a key="edit" onClick={() => {
          setCurrentTrade(record);
          setUpdateModalOpen(true);
        }}>编辑</a>
      ]
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
    <UpdateTradeModal 
      open={updateModalOpen}
      tradeInfo={currentTrade}
      onOpenChange={setUpdateModalOpen}
      onFinish={() => {

      }}
    />
  </PageContainer>
}

export default TradeList
