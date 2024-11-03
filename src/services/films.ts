
import { FilmInfo } from '@/types/film';
import { request } from '@umijs/max';

/** 获取电影列表 GET /api/films/list */
export async function getFilmList(
  params: {
    current?:number;
    pageSize?:number;
    filmType?:string;
    filmName?:string;
  },
  options?: { [key: string]: any },
) : Promise<API.ResponsePageData<FilmInfo>> {
  return request('/api/films/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 新增电影 */
export async function addFilm(body: FilmInfo, options?: { [key: string]: any }) {
  return request('/api/films/add', {
    method: 'POST',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

/** 删除电影 */
export async function deleteFilm(id: string, options?: { [key: string]: any }) {
  return request(`/api/films/delete`, {
    method: 'DELETE',
    params:{
      id,
    },
    ...(options || {}),
  });
}

/** 更新电影 */
export async function updateFilm(body: FilmInfo, options?: { [key: string]: any }) {
  return request('/api/films/update', {
    method: 'PUT',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

export async function getFilmNameList(options?: { [key: string]: any }) {
  return request('/api/films/getFilmForName', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取电影详情 */
export async function getFilmDetail(id: string, options?: { [key: string]: any }): Promise<FilmInfo> {
  return request(`/api/films/getFilmById`, {
    method: 'GET',
    params:{
      id,
    },
    ...(options || {}),
  });
}