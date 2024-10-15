import { deleteFilm, getFilmList } from '@/services/films';
import { FilmInfo } from '@/types/film';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import CreateFilmModal from './components/CreateFilmModal';
import UpdateFilmModal from './components/UpdateFilmModal';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const FilmList = () => {
  const actionRef = useRef<ActionType>();
  const [currentFilm, setCurrentFilm] = useState<FilmInfo | undefined>(undefined);

  const [createFilmModalOpen, setCreateFilmModalOpen] = useState(false);
  const [updateFilmModalOpen, setUpdateFilmModalOpen] = useState(false);
  const columns: ProColumns<FilmInfo>[] = [
    {
      title: 'ID',
      valueType: 'text',
      dataIndex: 'filmId',
      search: false,
    },
    {
      title: '电影名称',
      valueType: 'text',
      dataIndex: 'filmName',
    },
    {
      title: '电影类型',
      valueType: 'text',
      dataIndex: 'filmType',
    },
    {
      title: '电影语言',
      valueType: 'text',
      dataIndex: 'language',
      search: false,
    },
    {
      title: '电影时长',
      valueType: 'text',
      dataIndex: 'filmDuration',
      search: false,
    },
    {
      title: '简介',
      valueType: 'text',
      dataIndex: 'synopsis',
      width: 300,
      search: false,
    },
    {
      title: '票价',
      valueType: 'text',
      dataIndex: 'price',
      search: false,
    },
    {
      title: '海报',
      valueType: 'text',
      dataIndex: 'posters',
      search: false,
    },
    {
      title: '票房',
      valueType: 'text',
      dataIndex: 'boxOffice',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [<a key="edit" onClick={() => {
        setUpdateFilmModalOpen(true);
        setCurrentFilm(record);
      }}>编辑</a>, 
      <a key="delete" onClick={async () => {
        Modal.confirm({
          title: '删除电影',
          content: '确定删除该电影吗？',
          onOk: async () => {
            const res = await deleteFilm(record.filmId);
            if (res.code === 200) {
              message.success('删除电影成功');
              actionRef.current?.reload();
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
        actionRef={actionRef}
        rowKey="filmId"
        cardBordered
        headerTitle="电影列表"
        columns={columns}
        request={async (params) => {
          const data = await getFilmList(params);
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
              setCreateFilmModalOpen(true);
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
      <CreateFilmModal
        open={createFilmModalOpen}
        onOpenChange={setCreateFilmModalOpen}
        onFinish={() => {
          message.success('新增电影成功');
          actionRef.current?.reload();
        }}
      />
      <UpdateFilmModal
        filmInfo={currentFilm}
        open={updateFilmModalOpen}
        onOpenChange={setUpdateFilmModalOpen}
        onFinish={() => {
          message.success('修改电影成功');
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
}

export default FilmList;