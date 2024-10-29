import { deleteSession, getSessionList } from '@/services/session';
import { SessionInfo } from '@/types/session';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import CreateSessionModal from './components/CreateSessionModal';
import UpdateSessionModal from './components/UpdateSessionModal';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const SessionList = () => {
  const table = useRef<ActionType>();
  const [currentSession, setCurrentSession] = useState<SessionInfo | undefined>(undefined);

  const [createSessionModalOpen, setCreateSessionModalOpen] = useState(false);
  const [updateSessionModalOpen, setUpdateSessionModalOpen] = useState(false);
 
  const columns: ProColumns<SessionInfo>[] = [
    {
      title: 'id',
      valueType: 'index',
      dataIndex: 'index',
      search: false,
    },
    {
      title: '电影',
      valueType: 'text',
      dataIndex: 'filmName',
    },
    {
      title: '影厅',
      valueType: 'text',
      dataIndex: 'hallName',
      search: false,
    },
    {
      title: '时间',
      valueType: 'text',
      dataIndex: 'time',
      search: false,
    },
    {
      title: '操作',
      width: 100,
      valueType: 'option',
      render: (_, record) => [<a key="edit" onClick={() => {
        setUpdateSessionModalOpen(true);
        setCurrentSession(record);
      }}>编辑</a>,
      <a key="delete" onClick={async () => {
        Modal.confirm({
          title: '删除场次',
          content: '确定删除该场次吗？',
          onOk: async () => {
            const res = await deleteSession(record.sessionId);
            if (res.code === 200) {
              message.success('删除场次成功');
              table.current?.reload();
              return true;
            }
            message.error(res.message);
            return false;
          },
        })
      }}>删除</a>],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={table}
        rowKey="SessionId"
        cardBordered
        pagination={{ pageSize: 10 }}
        headerTitle="场次列表"
        columns={columns}
        request={async (params) => {
          const data = await getSessionList(params);
          return {
            data: data.data?.list ?? [],
            success: data.code === 200,
            total: data.data.count,
          };
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setCreateSessionModalOpen(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <CreateSessionModal
        open={createSessionModalOpen}
        onOpenChange={setCreateSessionModalOpen}
        onFinish={() => {
          message.success('新增影厅成功');
          table.current?.reload();
        }}
      />
      <UpdateSessionModal
        sessionInfo={currentSession}
        open={updateSessionModalOpen}
        onOpenChange={setUpdateSessionModalOpen}
        onFinish={() => {
          message.success('修改影厅成功');
          table.current?.reload();
        }}
      />
    </PageContainer>
  );
}

export default SessionList;
