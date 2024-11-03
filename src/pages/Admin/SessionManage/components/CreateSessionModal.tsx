import { getFilmNameList } from "@/services/films";
import { getHallNameList } from "@/services/hall";
import { addSession } from "@/services/session";
import { SessionInfo } from "@/types/session";
import { ModalForm, ProFormSelect, ProFormDateTimePicker } from '@ant-design/pro-components';
import { message } from "antd";

interface CreateSessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFinish: () => void;
}

const CreateSessionModal = ({ open, onOpenChange, onFinish }: CreateSessionModalProps) => {

  const handleCreate = async (values: SessionInfo) => {
    const res = await addSession(values);
    if (res.code === 200) {
      onFinish();
      return true;
    }

    message.error(res.message);
    return false;
  }

  return (
    <ModalForm
      title="新增场次"
      open={open}
      onFinish={handleCreate}
      size="middle"
      width={500}
      onOpenChange={onOpenChange}
      autoComplete="off"
    >
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


export default CreateSessionModal;
