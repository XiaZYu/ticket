import { addUser } from "@/services/users";
import { UserInfo } from "@/types/user";
import { ModalForm, ProFormSelect, ProFormText, ProFormDigit } from '@ant-design/pro-components';
import { message } from "antd";

interface CreateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFinish: () => void;
}

const CreateUserModal = ({ open, onOpenChange, onFinish }: CreateUserModalProps) => {

  const handleCreate = async (values: UserInfo) => {
    const res = await addUser(values);
    if (res.code === 200) {
      onFinish();
      return true;
    }

    message.error(res.message);
    return false;
  }

  return (
    <ModalForm
      title="新增用户"
      open={open}
      onFinish={handleCreate}
      size="middle"
      width={500}
      onOpenChange={onOpenChange}
      autoComplete="off"
    >
      <ProFormText name="name" label="姓名" />
      <ProFormText name="nickname" label="用户名" />
      <ProFormText name="phone" label="手机号" />
      <ProFormText name="email" label="邮箱" />
      <ProFormDigit name="age" label="年龄" min={1} max={100}/>
      <ProFormText.Password name="password" label="密码" />
      <ProFormSelect
        name="gender"
        label="性别"
        options={[
          { label: '男', value: '男' },
          { label: '女', value: '女' },
        ]}
      />
    </ModalForm>
  );
}


export default CreateUserModal;
