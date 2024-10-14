import { updateUser } from '@/services/users';
import { ModalForm, ProFormSelect, ProFormText, ProFormDigit, ProForm } from '@ant-design/pro-components';
import { message } from "antd";
import { useEffect } from "react";

interface UpdateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userInfo?: {
    uid:string,
    nickname:string,
    name:string,
    password:string,
    gender:string,
    age:number,
    phone:number,
    email:string
  }
  onFinish: () => void;
}

const UpdateUserModal = ({ open, onOpenChange, onFinish, userInfo }: UpdateUserModalProps) => {
  const [form] = ProForm.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...userInfo,
      });
    }
  }, [open, userInfo]);


  const handleCreate = async (values: UserInfo) => {
    const res = await updateUser(values);
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
      title="修改用户"
      open={open}
      onFinish={handleCreate}
      size="middle"
      width={500}
      onOpenChange={onOpenChange}
      autoComplete="off"
    >
      <ProFormText name="uid" label="用户ID" readonly />
      <ProFormText name="name" label="姓名" />
      <ProFormText name="nickname" label="用户名" />
      <ProFormText name="phone" label="手机号" />
      <ProFormText name="email" label="邮箱" />
      <ProFormDigit name="age" label="年龄" min={1} max={100}/>
      <ProFormSelect
        name="gender"
        label="性别"
        options={[
          { label: '男', value: '男' },
          { label: '女', value: '女' },
        ]}
      />
      <ProFormText.Password name="password" label="密码" placeholder="不修改请留空" />
    </ModalForm>
  );
}


export default UpdateUserModal;
