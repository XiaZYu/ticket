import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import {Button} from 'antd';
import {useRef} from 'react';
import {request} from "@@/exports";
import {getUsersList} from "@/services/ant-design-pro/users";

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
    search:false
  },
  {
    title: '年龄',
    dataIndex: 'age',
    search:false
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    search:false
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {

          action?.reload()
        }}
      >
        编辑
      </a>,
      <a  target="_blank" rel="noopener noreferrer" key="view">
        删除
      </a>,
    ],
  },
];

const UserList = () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params) =>{
         const res = await getUsersList(params)
          console.log(res)

          return {
           success: res.code === 200,
            data: res.data?.users ?? [],
            total:res.data?.count ?? 0,
          }
        }}

        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: {fixed: 'right', disable: true},
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="uid"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{pageSize: 10}}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined/>}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default UserList;
