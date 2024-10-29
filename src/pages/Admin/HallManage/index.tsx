import { deleteHall, getHallList } from '@/services/hall';
import { HallInfo } from '@/types/hall';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import CreateHallModal from './components/CreateHallModal';
import UpdateHallModal from './components/UpdateHallModal';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import currency from "currency.js";
import { Link } from '@umijs/max';
import CreateSeatModal from './components/CreatHallModal';
const HallList = () => {
  const table = useRef<ActionType>();
  const [currentHall, setCurrentHall] = useState<HallInfo | undefined>(undefined);

  const [createHallModalOpen, setCreateHallModalOpen] = useState(false);
  const [updateHallModalOpen, setUpdateHallModalOpen] = useState(false);
  const [createSeatModalOpen, setCreateSeatModalOpen] = useState(false);

  const columns: ProColumns<HallInfo>[] = [
    {
      title: 'id',
      valueType: 'index',
      dataIndex: 'index',
      search: false,
    },
    {
      title: '影厅名称',
      valueType: 'text',
      dataIndex: 'hallName',
    },
    {
      title: '影厅描述',
      valueType: 'text',
      dataIndex: 'hallDesc',
    },
    {
      title: '座位数',
      valueType: 'text',
      dataIndex: 'seats',
      search: false,
    },
    {
      title: '座位图',
      valueType: 'option',
      render: (_, record) => [
        <a 
          key="show" 
          onClick={() => {
            setCreateSeatModalOpen(true);
            setCurrentHall(record);
          }}
        >
          预览
        </a>
      ],
    },
    {
      title: '操作',
      width: 100,
      valueType: 'option',
      render: (_, record) => [<a key="edit" onClick={() => {
        setUpdateHallModalOpen(true);
        setCurrentHall(record);
      }}>编辑</a>,
      <a key="delete" onClick={async () => {
        Modal.confirm({
          title: '删除影厅',
          content: '确定删除该影厅吗？',
          onOk: async () => {
            const res = await deleteHall(record.hallId);
            if (res.code === 200) {
              message.success('删除影厅成功');
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
        rowKey="HallId"
        cardBordered
        pagination={{ pageSize: 10 }}
        headerTitle="电影列表"
        columns={columns}
        request={async (params) => {
          const data = await getHallList(params);
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
              setCreateHallModalOpen(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <CreateHallModal
        open={createHallModalOpen}
        onOpenChange={setCreateHallModalOpen}
        onFinish={() => {
          message.success('新增影厅成功');
          table.current?.reload();
        }}
      />
      <UpdateHallModal
        hallInfo={currentHall}
        open={updateHallModalOpen}
        onOpenChange={setUpdateHallModalOpen}
        onFinish={() => {
          message.success('修改影厅成功');
          table.current?.reload();
        }}
      />
      <CreateSeatModal
        hallInfo={currentHall}
        open={createSeatModalOpen}
        onOpenChange={setCreateSeatModalOpen}
        onFinish={() => {
          message.success('新增座位成功');
          table.current?.reload();
        }}
      />
    </PageContainer>
  );
}

export default HallList;
