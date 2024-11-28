import { Button, message, Modal } from 'antd';
import { Circle, Layer, Line, Rect, Stage, Group, Text } from 'react-konva';
import { useEffect, useRef, useState } from 'react';
import { Area, Seat } from '@/types/seat';
import { FilmInfo } from '@/types/film';
import { LeftOutlined } from '@ant-design/icons';
import {v4 as uuidv4} from 'uuid';
import { SessionInfo } from '@/types/session';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { getSessionSeatJson } from '@/services/session';
import { createTrade, payTrade } from '@/services/trade';
import { set } from 'lodash';

interface SeatSelelectModalProps {
  film: FilmInfo;
  session: SessionInfo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SeatSelelectModal = (props: SeatSelelectModalProps) => {
  const { film, session, open, onOpenChange } = props;
  const ref = useRef<HTMLDivElement>(null); 
  const [areas, setAreas] = useState<Area[]>([]);
  const [currentSelect, setCurrentSelect] = useState<Seat | null>(null);
  const [confirmSeats, setConfirmSeats] = useState<Seat[]>([]);
  const [payConfirm, setPayConfirm] = useState(false);
  const [tradeId, setTradeId] = useState(uuidv4());
  const [scale] = useState(1);

  function getSeatColor(seat: Seat, confirmSeats: Seat[]) {
    if (confirmSeats.some((item) => item.id === seat.id)) {
      return '#60a5fa';
    } else if (seat.status === 'enabled') {
      return '#e2e8f0';
    } else if (seat.status === 'sold' || seat.status === 'lock'){
      return '#60a5fa';
    }
  }
  useEffect(() => {
    getSessionSeatJson(session.sessionId).then((res) => {
      const data = JSON.parse(res.data);
      console.log(data);
      setAreas(data);
    }
    );
  },[session.sessionId]);
  const columns: ProColumns<Seat>[] = [
    {
      key: 'index',
      title: '序号',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      key: 'setInfo',
      title: '座位信息',
      render: (_, record: any) => {
        return (
          <div>
            {record.row} 排 {record.col} 座 ({record.seatType})
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setConfirmSeats([]);
  }, [open]);

  return (
    <Modal
      title={
        payConfirm ? (
          <div className="flex gap-2 items-center">
            <Button
              ghost
              icon={<LeftOutlined className="text-zinc-800" />}
              onClick={() => setPayConfirm(false)}
            />
            <div className="text-lg font-bold">支付确认</div>
          </div>
        ) : (
          <div>
            <div className="text-lg font-bold">选择座位</div>
          </div>
        )
      }
      open={open}
      onCancel={() => onOpenChange(false)}
      footer={null}
      width={1200}
    >
      {!payConfirm && (
        <div className="flex gap-2 ">
          <div className="flex flex-col gap-4 w-[960px] mx-auto">
            <div
              className="relative"
              ref={ref}
              style={{
                height: 500,
              }}
            >
              <Stage width={960} height={500}>
                <Layer
                  onClick={() => {
                    setCurrentSelect(null);
                  }}
                >
                  <Rect x={0} y={0} width={960} height={500} fill="#f8fafc" />
                </Layer>
                <Layer>
                  {areas.map((area) => (
                    <Group key={area.id} x={area.x * scale} y={area.y * scale}>
                      {area.showName && (
                        <Text
                          y={10}
                          width={area.width * scale}
                          height={area.height * scale}
                          text={area.name}
                          fontSize={14}
                          fill="#000"
                          align="center"
                        />
                      )}
                      {area.seats
                        .filter((seat) => seat.status !== 'disabled')
                        .map((seat) => {
                          const x = seat.x * scale;
                          const y = area.showName ? seat.y * scale + 24 : seat.y * scale;
                          return (
                            <>
                              <Circle
                                key={seat.id}
                                x={x}
                                y={y}
                                width={seat.width * scale}
                                height={seat.height * scale}
                                fill={getSeatColor(seat, confirmSeats)}
                                onClick={() => {
                                  setCurrentSelect(seat);
                                }}
                                onDblClick={() => {
                                  if (
                                    seat.status === 'enabled' &&
                                    !confirmSeats.some((item) => item.id === seat.id)
                                  ) {
                                    setConfirmSeats((prev) => [...prev, seat]);
                                  } else {
                                    setConfirmSeats((prev) =>
                                      prev.filter((item) => item.id !== seat.id),
                                    );
                                  }
                                }}
                                onMouseEnter={(e) => {
                                  const container = e.target.getStage()?.container() as
                                    | HTMLDivElement
                                    | undefined;
                                  if (container) {
                                    container.style.cursor = 'pointer';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  const container = e.target.getStage()?.container() as
                                    | HTMLDivElement
                                    | undefined;
                                  if (container) {
                                    container.style.cursor = 'default';
                                  }
                                }}
                              />
                              {currentSelect && currentSelect.id === seat.id && (
                                <Line
                                  points={[
                                    0,
                                    0,
                                    seat.width * scale,
                                    0,
                                    seat.width * scale,
                                    seat.height * scale,
                                    0,
                                    seat.height * scale,
                                    0,
                                    0,
                                  ]}
                                  x={currentSelect.x * scale - (currentSelect.width * scale) / 2}
                                  y={
                                    area.showName
                                      ? currentSelect.y * scale +
                                        24 -
                                        (currentSelect.height * scale) / 2
                                      : currentSelect.y * scale - (currentSelect.height * scale) / 2
                                  }
                                  strokeWidth={2 * scale}
                                  stroke="#f59e0b"
                                  lineCap="square"
                                />
                              )}
                            </>
                          );
                        })}
                      {currentSelect &&
                        currentSelect.type === 'area' &&
                        currentSelect.id === area.id && (
                          <Line
                            points={[
                              0,
                              0,
                              area.width * scale,
                              0,
                              area.width * scale,
                              area.showName ? area.height * scale + 24 : area.height * scale,
                              0,
                              area.showName ? area.height * scale + 24 : area.height * scale,
                              0,
                              0,
                            ]}
                            stroke="#f59e0b"
                            strokeWidth={2 * scale}
                            lineCap="square"
                          />
                        )}
                    </Group>
                  ))}
                </Layer>
                <Layer>
                  <Line points={[0, 0, 960, 0, 960, 500, 0, 500, 0, 0]} stroke="#475569" />
                </Layer>
              </Stage>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="font-bold text-lg">当前座位信息</div>
              {currentSelect ? (
                <div>
                  {currentSelect.row} 排 {currentSelect.col} 座 ({currentSelect.seatType})
                </div>
              ) : (
                <div>请点击座位选择</div>
              )}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="font-bold text-lg">已选座位 ({confirmSeats.length} 个)</div>
              <div className="flex flex-col gap-1 flex-1 max-h-40 overflow-y-auto">
                {confirmSeats.map((seat) => (
                  <div key={seat.id} className="bg-60a5fa py-1 rounded">
                    {seat.row} 排 {seat.col} 座 ({seat.seatType})
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex gap-1 items-end">
                <div>总计：</div>
                <div className="text-2xl font-bold text-orange-500">
                  {confirmSeats.length * film.price} 元
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                disabled={confirmSeats.length === 0}
                type="primary"
                onClick={() => {
                  if (confirmSeats.length === 0) {
                    return;
                  }
                  const seats = confirmSeats.map((item) => item.id).join('//');
                  createTrade({tradeId: tradeId, filmId:film.filmId, price:confirmSeats.length * film.price, seat: seats, sessionId: session.sessionId, status: '未支付', hallId: session.hallId});
                  setPayConfirm(true);
                }}
              >
                支付
              </Button>
              <Button
                disabled={confirmSeats.length === 0}
                onClick={() => {
                  setCurrentSelect(null);
                  setConfirmSeats([]);
                }}
              >
                清空
              </Button>
            </div>
          </div>
        </div>
      )}
      {payConfirm && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-6">
            <div>
              <img src={film.posters} alt={film.filmName} />
            </div>
            <div className="flex flex-col gap-6">
              <div className="text-lg font-bold">{film.filmName}</div>
              <div>语言：{film.language}</div>
              <div>时间：{session.time}</div>
              <div>订单编号：{new Date().getTime()}</div>
              <div>
                订单金额：
                <span className="text-2xl font-bold text-orange-500">
                  {confirmSeats.length * film.price}
                </span>{' '}
                元
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <ProTable<Seat>
              columns={columns}
              dataSource={confirmSeats}
              options={false}
              rowKey="id"
              search={false}
              pagination={
                confirmSeats.length > 5
                  ? {
                      pageSize: 5,
                    }
                  : false
              }
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="primary"
              onClick={() => {
                console.log(tradeId);
                payTrade({ tradeId: tradeId, uid: '', price: confirmSeats.length * film.price }).then(() => {
                  onOpenChange(false);
                })
                message.success('支付成功');
              }}
            >
              确认支付
            </Button>
            <Button
              onClick={() => {
                setPayConfirm(false);
              }}
            >
              返回
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SeatSelelectModal;
