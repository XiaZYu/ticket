import { Carousel } from 'antd';
import FilmList from '@/components/FilmList';
import { useRequest } from '@umijs/max';
import { getFilmList } from '@/services/films';

const UserWelcome = () => {

  const carouselList = [
    {
      id: 1,
      url: '/images/banner1.jpg',
    },
    {
      id: 2,
      url: '/images/banner2.jpg',
    },
    {
      id: 3,
      url: '/images/banner3.jpg',
    },
    {
      id: 4,
      url: '/images/banner4.jpg',
    },
    {
      id: 5,
      url: '/images/banner5.jpg',
    },
  ];

  const {data} = useRequest(() => getFilmList({
    current: 1,
    pageSize: 10
  }))


  return (
    <div className="flex flex-col gap-8 mb-8">
      <Carousel autoplay>
        {carouselList.map((item) => (
          <div key={item.id} className="h-[610px] w-full">
            <div
              className="h-[610px] w-full bg-cover bg-center backdrop-blur-lg"
              style={{ backgroundImage: `url(${item.url})` }}
            >
              <div
                className="h-[610px] w-full bg-contain bg-center bg-no-repeat backdrop-blur-xl"
                style={{ backgroundImage: `url(${item.url})` }}
              />
            </div>
          </div>
        ))}
      </Carousel>
      <FilmList
        title={
          <div>
            <span>热门电影</span>
            <span className="text-sm text-gray-400">（每日更新）</span>
          </div>
        }
        data={data?.list || []}
      />
    </div>
  );
};

export default UserWelcome;
