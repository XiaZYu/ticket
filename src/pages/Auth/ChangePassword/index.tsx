import { changePassword } from '@/services/auth';
import { PageContainer, ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';

const ChangePassword = () => {
  const [form] = ProForm.useForm();

  const handleSubmit = async (values: any) => {
    const res = await changePassword(values);
    if (res.code === 200) {
      message.success('修改成功');
      form.resetFields();
    } else {
      message.error(res.message);
    }
  }

  return (
    <PageContainer>
      <ProCard>
        <ProForm form={form} autoCapitalize="new-password" onFinish={handleSubmit}>
          <ProFormText.Password
            name="oldPassword"
            label="旧密码"
            fieldProps={{
              autoCapitalize: 'new-password',
            }}
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          />
          <ProFormText.Password
            name="newPassword"
            label="新密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              {
                pattern: /^(?=.*\d)(?=.*[A-z])[\da-zA-Z]{6,12}$/,
                message: '由6-12位数字和字母组成',
              },
            ]}
          />
          <ProFormText.Password
            name="repeatPassword"
            label="重复密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码不一致'));
                },
              }),
            ]}
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default ChangePassword;
