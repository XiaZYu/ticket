import { getSessionByFilmId } from '@/services/session';
import { FilmInfo } from '@/types/film';
import { SessionInfo } from '@/types/session';
import { useRequest } from '@umijs/max';
import { Button, Tabs } from 'antd';
import { useMemo, useState } from 'react';
import SeatSelelectModal from './SeatSelelectModal';

interface SessionTabProps {
  film: FilmInfo;
}

const SessionTab = (props: SessionTabProps) => {
  const { film } = props;
  const filmId = film.filmId;

  const [dateSelected, setDateSelected] = useState<string>('');
  const [currentSession, setCurrentSession] = useState<SessionInfo>();
  const [seatSelectModalOpen, setSeatSelectModalOpen] = useState(false);

  const { data } = useRequest(() => getSessionByFilmId(filmId), {
    refreshDeps: [filmId],
  });

  const sessionByDate = useMemo(() => {
    console.log(data);
    if (!data) {
      return {};
    }

    let sessionInfo = data as SessionInfo[];
    const result: Map<string, any[]> = new Map();
    sessionInfo?.forEach((item) => {
      const date = item.time.split(' ')[0];
      if (!result.has(date)) {
        result.set(date, []);
      }
      result.get(date)?.push(item);
    });
    return Object.fromEntries(result);
  }, [data]);

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        accessKey={dateSelected}
        onChange={(key) => {
          setDateSelected(key);
        }}
      >
        {Object.keys(sessionByDate).map((date) => {
          return (
            <Tabs.TabPane tab={date} key={date}>
              <div className="flex flex-col gap-4 ">
                {sessionByDate[date].map((session) => {
                  const time = session.time.split(' ')[1];
                  return (
                    <div
                      key={session.id}
                      className="flex justify-between items-center even:bg-gray-200 p-4"
                    >
                      <div className="flex flex-col gap-1 items-center">
                        <div className="font-bold text-lg">{time}</div>
                        <div>{session.hallName}</div>
                      </div>
                      <div>{film.language}</div>
                      <div className="text-orange-500 text-lg">{film.price} 元</div>
                      <Button
                        type="primary"
                        onClick={() => {
                          setSeatSelectModalOpen(true);
                          setCurrentSession(session);
                        }}
                      >
                        购票
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Tabs.TabPane>
          );
        })}
      </Tabs>
      {currentSession && (
        <SeatSelelectModal
          film={film}
          session={currentSession}
          open={seatSelectModalOpen}
          onOpenChange={setSeatSelectModalOpen}
        />
      )}
    </div>
  );
};

export default SessionTab;
