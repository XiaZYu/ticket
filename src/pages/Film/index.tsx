import FilmList from "@/components/FilmList"
import { getFilmList } from "@/services/films";
import { useRequest } from "@umijs/max";
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { Flex, Pagination } from "antd";
import classNames from "classnames";
import {usePagination} from "ahooks"

const FilmPage = () => {
  const { data, pagination, run } = usePagination(({pageSize, current, ...params}) =>
    getFilmList({
      current,
      pageSize,
      ...params
    }).then((res) => ({
      list: res.data.list,
      total: res.data.count
    })), {
      defaultPageSize: 30,
    }
  );

  const { data: hostList } = useRequest(() =>
    getFilmList({
      current: 1,
      pageSize: 20,
    }),
  );

  const handleSearch = (values: any) => {
    run(values);
  } 

  return (
    <PageContainer>
      <Flex gap={20}>
        <div className="flex-1">
          <ProForm
            onFinish={handleSearch}
            className="mb-4"
            layout="inline"
            submitter={{
              searchConfig: {
                submitText: '搜索',
              },
              render: (_, dom) => dom.pop(),
            }}
          >
            <ProFormText name="filmName" label="电影名称" />
            <ProFormText name="language" label=" 类型" />
          </ProForm>
          <FilmList data={data?.list || []} cardWidth={150} />
          <div className="mt-4 flex items-center justify-center">
            <Pagination
              {...pagination}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `共 ${total} 条`}
            />
          </div>
        </div>
        <div className="w-56 hidden md:block">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-10">
            <h3 className="font-bold text-lg mb-2">热门排行</h3>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <p className="text-gray-500">排名</p>
                <p className="flex-1 font-semibold">电影名称</p>
                <p>票房</p>
              </div>
              {hostList?.list
                ?.sort((a, b) => Number(b.boxOffice) - Number(a.boxOffice))
                .map((film, index) => (
                  <div className="flex gap-2 items-center" key={film.filmId} title={film.filmName}>
                    <p className="text-gray-500">{index + 1}</p>
                    <p
                      className={classNames('flex-1 truncate  font-semibold', {
                        'text-lg text-red-500': index === 0,
                        'text-orange-500': index < 3,
                      })}
                    >
                      {film.filmName}
                    </p>
                    <p>{film.boxOffice} 万</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Flex>
    </PageContainer>
  );
}

export default FilmPage;