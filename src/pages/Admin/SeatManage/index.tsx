import { PageContainer, ModalForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Circle, Layer, Line, Rect, Stage, Group, Text } from 'react-konva';
import { createArea } from './utils';
import { Button } from 'antd';
import { Area, Seat } from '@/types/seat';


const SeatManage = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const [currentSelect, setCurrentSelect] = useState<Area | Seat | null>(null)

  const [areas, setAreas] = useState<Area[]>([])

  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <div>
          <ModalForm
            title="添加区域"
            width={400}
            trigger={<Button>添加区域</Button>}
            onFinish={async (values) => {
              console.log(values);
              const area = createArea(values as any);
              setAreas([...areas, area]);
              return true;
            }}
          >
            <ProFormText label="名称" name="name" />
            <ProFormDigit label="行数" name="rows" />
            <ProFormDigit label="列数" name="cols" />
          </ModalForm>
        </div>
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
                  <Group
                    draggable
                    key={area.id}
                    onDragMove={(e) => {
                      const target = e.target;
                      area.x = target.x() / scale;
                      area.y = target.y() / scale;
                      setAreas([...areas]);
                    }}
                  >
                    <Rect
                      x={0}
                      y={0}
                      width={area.width * scale}
                      height={area.showName ? area.height * scale + 24 : area.height * scale}
                      fill="#fff"
                      onClick={() => {
                        setCurrentSelect(area);
                      }}
                    />
                    {area.showName && (
                      <Text
                        y={10}
                        width={area.width * scale}
                        height={area.height * scale}
                        text={area.name}
                        fontSize={14}
                        fill="#000"
                        align="center"
                        onClick={() => {
                          setCurrentSelect(area);
                        }}
                      />
                    )}
                    {area.seats.map((seat) => {
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
                            fill={seat.status === 0 ? '#f1f5f9' : '#60a5fa'}
                            onClick={() => {
                              setCurrentSelect(seat);
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
                              lineCap='square'
                            />
                          )}
                        </>
                      );
                    })}
                    {currentSelect && currentSelect.id === area.id && (
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
                        lineCap='square'
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
          <div className="flex items-center justify-center gap-2">
            <Button onClick={() => setScale(scale + 0.1)}>放大</Button>
            <Button onClick={() => setScale(scale - 0.1)}>缩小</Button>
            {currentSelect && currentSelect.type === 'circle' && (
              <Button
                onClick={() => {
                  (currentSelect as Seat).status =
                    (currentSelect as Seat).status === 0 ? 1 : 0;
                  setAreas([...areas]);
                }}
              >
                {(currentSelect as Seat).status === 0 ? '启用' : '禁用'}
              </Button>
            )}
            {currentSelect && currentSelect.type === 'area' && (
              <>
                <Button
                  onClick={() => {
                    (currentSelect as Area).showName = !(
                      currentSelect as Area
                    ).showName;
                    setAreas([...areas]);
                  }}
                >
                  {(currentSelect as Area).showName ? '隐藏名称' : '显示名称'}
                </Button>
                <Button
                  onClick={() => {
                    setAreas(areas.filter((area) => area.id !== currentSelect.id));
                    setCurrentSelect(null);
                  }}
                >
                  删除区域
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default SeatManage


