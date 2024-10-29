import { getFilmNameList } from '@/services/films';
import { getHallNameList } from '@/services/hall';
import { updateSession } from '@/services/session';
import { SessionInfo } from '@/types/session';
import { ModalForm, ProFormSelect, ProFormText, ProFormDigit, ProForm, ProFormDateTimePicker } from '@ant-design/pro-components';
import { message } from "antd";
import { values } from 'lodash';
import { useEffect } from "react";
import { Label } from 'react-konva';

interface UpdateSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionInfo?: SessionInfo;
  onFinish: () => void;
}

const UpdateSessionModal = ({ open, onOpenChange, onFinish, sessionInfo }: UpdateSessionModalProps) => {
  const [form] = ProForm.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...sessionInfo,
      });
    }
  }, [open, sessionInfo]);


  const handleCreate = async (values: SessionInfo) => {
    console.log(values);
    const res = await updateSession(values);
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
      title="修改电影"
      open={open}
      onFinish={handleCreate}
      size="middle"
      width={500}
      onOpenChange={onOpenChange}
      autoComplete="off"
    >
      <ProFormText name="sessionId" label="场次ID" readonly />
      <ProFormSelect 
      name="filmName" 
      label="电影"
      showSearch
      request={async () => {
        const res = await getFilmNameList();
        console.log(res);
        return (
          res.map((item: any) => {
            return {
              label: item,
              value: item,
            }
          }
        )
      )
      }}
      />
      <ProFormSelect 
      name="hallName" 
      label="影厅" 
      showSearch
      request={async () => {
        const res = await getHallNameList();
        console.log(res);
        return (
          res.map((item: any) => {
            return {
              label: item,
              value: item,
            }
          }
        )
      )
      }}
      />
      <ProFormDateTimePicker
            name="time"
            label="时间"
            fieldProps={{
              format: (value) => value.format('YYYY-MM-DD HH:mm:ss'),
            }}
          />
    </ModalForm>
  );
}


export default UpdateSessionModal;
