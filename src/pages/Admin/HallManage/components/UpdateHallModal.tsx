import { updateHall } from '@/services/hall';
import { HallInfo } from '@/types/hall';
import { ModalForm, ProFormText, ProForm } from '@ant-design/pro-components';
import { message } from "antd";
import { useEffect } from "react";

interface UpdateHallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hallInfo?: HallInfo;
  onFinish: () => void;
}

const UpdateHallModal = ({ open, onOpenChange, onFinish, hallInfo: hallInfo }: UpdateHallModalProps) => {
  const [form] = ProForm.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...hallInfo,
      });
    }
  }, [open, hallInfo]);


  const handleCreate = async (values: HallInfo) => {
    const res = await updateHall(values);
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
      title="修改影厅"
      open={open}
      onFinish={handleCreate}
      size="middle"
      width={500}
      onOpenChange={onOpenChange}
      autoComplete="off"
    >
      <ProFormText name="hallId" label="影厅ID" readonly />
      <ProFormText name="hallName" label="影厅名称" />
      <ProFormText name="seats" label="座位数" />
      <ProFormText name="hallDesc" label="影厅介绍" />
    </ModalForm>
  );
}


export default UpdateHallModal;
