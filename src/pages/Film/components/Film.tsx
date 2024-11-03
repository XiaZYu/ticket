import { getFilmDetail } from '@/services/films';
import { FilmInfo } from '@/types/film';
import { useRequest } from '@umijs/max';
import { Result } from 'antd';
import FilmBanner from './FilmBanner';
import SessionTab from './SessionTab';

interface FilmProps {
  id: string;
}

const Film = (props: FilmProps) => {
  const { id } = props;
  const { data: film } = useRequest(() => getFilmDetail(id), {
    refreshDeps: [id],
  });

  const data = film as FilmInfo;

  return (
    <div>
      {!data && <Result status="404" title="未找到该电影" />}
      {data && (
        <>
          <FilmBanner film={data} />
          <SessionTab film={data} />
        </>
      )}
    </div>
  );
};

export default Film;
