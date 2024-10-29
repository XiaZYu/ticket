import { updateTrade } from '@/services/trade';
import { TradeInfo } from '@/types/trade';
import { ModalForm, ProFormText, ProForm, ProFormSelect } from '@ant-design/pro-components';
import { message } from "antd";
import { useEffect } from "react";

interface UpdateTradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tradeInfo?: TradeInfo;
  onFinish: () => void;
}

const UpdateTradeModal = ({ open, onOpenChange, onFinish, tradeInfo }: UpdateTradeModalProps) => {
  const [form] = ProForm.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...tradeInfo,
      });
    }
  }, [open, tradeInfo]);


  const handleCreate = async (values: TradeInfo) => {
    const res = await updateTrade(values);
    if (res.code === 200) {
      onFinish();
      return true;
    }

    message.error(res.message);
    return false;
  }

  return (
    <ModalForm
    form={form}
      title="修改订单信息"
      open={open}
      onFinish={handleCreate}
      size="middle"
      width={500}
      onOpenChange={onOpenChange}
      autoComplete="off"
    >
      <ProFormText name="tradeId" label="订单编号" readonly />
      <ProFormText name="filmName" label="电影" readonly />
      <ProFormText name="cinemaName" label="影院" readonly />
      <ProFormText name="name" label="用户" readonly />
      <ProFormText name="phone" label="手机号" />
      <ProFormSelect name="status" label="状态" valueEnum={{
        "已支付": "已支付",
        "未支付": "未支付",
        "取消": "取消",
      }} />
    </ModalForm>
  );
}


export default UpdateTradeModal;
