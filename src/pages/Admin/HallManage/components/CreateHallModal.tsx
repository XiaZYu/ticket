import { addHall } from "@/services/hall";
import { HallInfo } from "@/types/hall";
import { ModalForm, ProFormSelect, ProFormText, ProFormDigit } from '@ant-design/pro-components';
import { message } from "antd";

interface CreateHallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hallInfo?: HallInfo;
  onFinish: () => void;
}

const CreateHallModal = ({ open, onOpenChange, onFinish }: CreateHallModalProps) => {

  const handleCreate = async (values: HallInfo) => {
    const res = await addHall(values);
    if (res.code === 200) {
      onFinish();
      return true;
    }

    message.error(res.message);
    return false;
  }

  return (
    <ModalForm
      title="新增影厅"
      open={open}
      onFinish={handleCreate}
      size="middle"
      width={500}
      onOpenChange={onOpenChange}
      autoComplete="off"
    >
      <ProFormText name="hallName" label="影厅名称" />
      <ProFormText name="seats" label="座位数" />
      <ProFormText name="hallDesc" label="影厅介绍" />
    </ModalForm>
  );
}


export default CreateHallModal;
