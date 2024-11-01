import { FilmInfo } from "@/types/film";
import React, { HtmlHTMLAttributes } from "react";

interface Props extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  cardWidth?: number
  data: FilmInfo[]
}


const FilmList = (props: Props) => {
  const {title, cardWidth = 200, data, ...restProps} = props


  return (
    <div {...restProps}>
      {title && <div className="text-2xl font-bold mb-4">{title}</div>}
      <div className="grid gap-4" style={{
        gridTemplateColumns: `repeat(auto-fill,minmax(${cardWidth}px,1fr))`
      }}>
        {data?.map((film: FilmInfo) => {
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
                  <div className="text-zinc-100 truncate">{film.language}</div>
                  <div className="text-zinc-100 flex-shrink-0">{film.filmDuration} 分钟</div>
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

export default FilmList;