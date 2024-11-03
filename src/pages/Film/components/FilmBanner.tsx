import { FilmInfo } from '@/types/film';

interface FilmBannerProps {
  film: FilmInfo;
}

const FilmBanner = (props: FilmBannerProps) => {
  const { film } = props;
  return (
    <div
      className="relative"
      style={{
        height: '400px',
      }}
    >
      <div className="absolute top-0 w-full h-full z-10 bg-black/30 backdrop-blur-lg" />
      <div
        className="absolute top-0 w-full h-full bg-cover rounded-lg shadow-lg bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${film.posters})`,
        }}
      />

      <div className="absolute top-0 w-full h-full z-20 px-8 py-4">
        <div className="text-white text-2xl font-bold border-b pb-4 border-zinc-400">
          {film.filmName}
        </div>
        <div className="flex gap-4 pt-4">
          <img className="w-48 h-72 object-cover" src={film.posters} alt="" />
          <div>
            {film.synopsis.split('//').map((item: string, index: number) => {
              const itemArr = item.split('：');
              return (
                <div className="text-white text-lg first:mt-0 mt-4" key={index}>
                  <span className="text-zinc-400">{itemArr[0]}：</span>
                  {itemArr[1]}
                </div>
              );
            })}
            <div className="text-white text-lg mt-4">
              <span className="text-zinc-400">类型：</span>
              {film.filmType}
            </div>
            <div className="text-white text-lg mt-4">
              <span className="text-zinc-400">语言：</span>
              {film.language}
            </div>
            <div className="text-white text-lg mt-4">
              <span className="text-zinc-400">时长：</span>
              {film.filmDuration} 分钟
            </div>
            <div className="text-white text-lg mt-4">
              <span className="text-zinc-400">票房：</span>
              {film.boxOffice} 万
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmBanner;
