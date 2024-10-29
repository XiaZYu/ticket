import { deleteFilm, getFilmList } from '@/services/films';
import { FilmInfo } from '@/types/film';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import CreateFilmModal from './components/CreateFilmModal';
import UpdateFilmModal from './components/UpdateFilmModal';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import currency from "currency.js";
const FilmList = () => {
  const table = useRef<ActionType>();
  const [currentFilm, setCurrentFilm] = useState<FilmInfo | undefined>(undefined);

  const [createFilmModalOpen, setCreateFilmModalOpen] = useState(false);
  const [updateFilmModalOpen, setUpdateFilmModalOpen] = useState(false);
  const columns: ProColumns<FilmInfo>[] = [
    {
      title: 'id',
      valueType: 'index',
      dataIndex: 'index',
      search: false,
    },
    {
      title: '海报',
      valueType: 'image',
      dataIndex: 'posters',
      search: false,
    },
    {
      title: '电影名称',
      valueType: 'text',
      dataIndex: 'filmName',
      minWidth: 150,
    },
    {
      title: '电影类型',
      valueType: 'text',
      dataIndex: 'filmType',
      minWidth: 150,
    },
    {
      title: '电影语言',
      valueType: 'text',
      dataIndex: 'language',
      search: false,
      minWidth: 150,
    },
    {
      title: '电影时长',
      width: 120,
      valueType: 'text',
      dataIndex: 'filmDuration',
      search: false,
      renderText: text => `${text} 分钟`
    },
    {
      title: '简介',
      valueType: 'text',
      dataIndex: 'synopsis',
      search: false,
    },
    {
      title: '票价',
      valueType: 'text',
      dataIndex: 'price',
      width:100,
      search: false,
      renderText:text => `${currency(text)} 元`
    },
    {
      title: '票房',
      width: 100,
      valueType: 'text',
      dataIndex: 'boxOffice',
      search: false,
      renderText:text => `${currency(text)} 万元`
    },
    {
      title: '操作',
      width: 100,
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
        rowKey="filmId"
        cardBordered
        pagination={{ pageSize: 10}}
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
          table.current?.reload();
        }}
      />
      <UpdateFilmModal
        filmInfo={currentFilm}
        open={updateFilmModalOpen}
        onOpenChange={setUpdateFilmModalOpen}
        onFinish={() => {
          message.success('修改电影成功');
          table.current?.reload();
        }}
      />
    </PageContainer>
  );
}

export default FilmList;
