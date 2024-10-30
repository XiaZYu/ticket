import { Carousel } from 'antd';
import WelcomeFilmList from './components/WelcomeFilmList';

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
      <WelcomeFilmList />
    </div>
  );
};

export default UserWelcome;
