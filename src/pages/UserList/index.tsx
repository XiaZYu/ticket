import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import {Button, message, Modal} from 'antd';
import {useRef, useState} from 'react';
import {deleteUser, getUsersList} from "@/services/users";
import CreateUserModal from './components/CreateUserModal';
import UpdateUserModal from './components/UpdateUserModal';

type Item = {
  uid:string,
  nickname:string,
  name:string,
  password:string,
  gender:string,
  age:number,
  phone:number,
  email:string
};


const UserList = () => {
  const actionRef = useRef<ActionType>();
  const [currentUser, setCurrentUser] = useState<Item | undefined>(undefined);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [updateUserModalOpen, setUpdateUserModalOpen] = useState(false);
  

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '删除用户',
      content: '确定删除该用户吗？',
      onOk: async () => {
        const res = await deleteUser(id);
        if (res.code === 200) {
          message.success('删除用户成功');
          actionRef.current?.reload();
          return true;
        }
        message.error(res.message);
        return false;
      },
    })
  }

  const columns: ProColumns<Item>[] = [
    {
      dataIndex: 'index',
      valueType: 'index',
      width: 48,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '用户名',
      dataIndex: 'nickname',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      search: false,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      search: false,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            setCurrentUser(record);
            setUpdateUserModalOpen(true);
          }}
        >
          编辑
        </a>,
        <a target="_blank" rel="noopener noreferrer" key="view" onClick={() => handleDelete(record.uid)}>
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) => {
          const res = await getUsersList(params);
          return {
            success: res.code === 200,
            data: res.data?.users ?? [],
            total: res.data?.count ?? 0,
          };
        }}
        rowKey="uid"
        pagination={{ pageSize: 10 }}
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setCreateUserModalOpen(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <CreateUserModal
        open={createUserModalOpen}
        onFinish={() => {
          message.success('新增用户成功');
          actionRef.current?.reload();
        }}
        onOpenChange={setCreateUserModalOpen}
      />
      <UpdateUserModal
        open={updateUserModalOpen}
        onFinish={() => {
          message.success('更新用户成功');
          actionRef.current?.reload();
        }}
        onOpenChange={setUpdateUserModalOpen}
        userInfo={currentUser}
      />
    </PageContainer>
  );
};

export default UserList;
