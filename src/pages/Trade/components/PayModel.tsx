import { Modal } from 'antd';
import { TradeInfo, TradeSeat } from '@/types/trade';
import React from 'react';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import { payTrade } from '@/services/trade';

interface PayModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tradeinfo?: TradeInfo;
  onFinish: () => void;
}

const PayModel = ({ open, onOpenChange, onFinish, tradeinfo }: PayModelProps) => {
  const columns: ProColumns<TradeSeat>[] = [
    {
      key: 'index',
      valueType: 'index',
      title: '序号',
    },
    {
      title: '座位',
      dataIndex: 'seat',
      renderText: (_, record) => {
        return `${record.srow.toString().padStart(2, '0')} 排 ${record.scolumn
          .toString()
          .padStart(2, '0')} 座 （${record.seatType}）`;
      },
    },
  ];

  return (
    <Modal title="支付" open={open} onCancel={() => onOpenChange(false)} okText="立即支付"
      onOk={() => {
        payTrade({ tradeId: tradeinfo?.tradeId, uid: '', price: tradeinfo?.price }).then(() => {
          onFinish();
          onOpenChange(false);
        })
      }}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          <div>
            <img src={tradeinfo?.posters} alt={tradeinfo?.filmName} />
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-lg font-bold">{tradeinfo?.filmName}</div>
            <div>时间：{tradeinfo?.time}</div>
            <div>
              <div>订单编号：</div>
              <div>{tradeinfo?.tradeId}</div>
            </div>
            <div>
              订单金额：
              <span className="text-2xl font-bold text-orange-500">{tradeinfo?.price}</span> 元
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <ProTable<TradeSeat>
            columns={columns}
            dataSource={tradeinfo?.seatList}
            options={false}
            rowKey="id"
            search={false}
            pagination={
              tradeinfo?.seatList && tradeinfo.seatList.length > 5
                ? {
                  pageSize: 5,
                }
                : false
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default PayModel;
