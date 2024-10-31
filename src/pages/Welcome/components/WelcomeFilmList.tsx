import { getFilmList } from "@/services/films"
import { FilmInfo } from "@/types/film";
import { useRequest } from "@umijs/max"
import { HtmlHTMLAttributes } from "react";

type Props = HtmlHTMLAttributes<HTMLDivElement>

const WelcomeFilmList = (props: Props) => {
  const {data} = useRequest(() => getFilmList({
    current: 1,
    pageSize: 10
  }))

  return (
    <div {...props}>
      <h2 className="text-xl mb-4 font-medium">正在热映</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 ">
        {data?.list?.map((film: FilmInfo) => {
          return (
            <div
              key={film.filmId}
              className="relative border aspect-[9/12] rounded-lg overflow-hidden"
            >
              <div className="absolute top-0 w-full flex p-2"></div>
              <div className="absolute w-full h-full bg-gradient-to-b from-transparent from-50% to-black/90"></div>
              <img className="w-full h-full cover" src={film.posters} alt={film.filmName} />
              <div className="w-full  absolute bottom-0 p-2 text-white">
                <div className="flex gap-2">
                  <div className="text-zinc-100">{film.language}</div>
                  <div className="text-zinc-100">{film.filmDuration} 分钟</div>
                </div>
                <div className="flex gap-2 justify-between items-center">
                  <div className="truncate text-lg">{film.filmName}</div>
                  <button
                    type="button"
                    className="px-2 py-1 bg-blue-400 rounded-md flex-shrink-0 hover:bg-blue-500"
                  >
                    购票
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WelcomeFilmList;