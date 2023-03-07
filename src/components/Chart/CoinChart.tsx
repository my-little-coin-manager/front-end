import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { init, dispose, CandleType, LineType } from "klinecharts";

import useGetInitialDataList from "../../Hooks/useGetInitialDataList";
import useNewData from "../../Hooks/useNewData";
import styled from "styled-components";

const types = [
  { key: "candle_solid", text: "Solid" },
  { key: "candle_stroke", text: "Stroke" },
  { key: "candle_up_stroke", text: "Rise" },
  { key: "candle_down_stroke", text: "Fall" },
  { key: "ohlc", text: "OHLC" },
  { key: "area", text: "mountain" }
];

const CoinChart = () => {
  let chart: any;
  const [initialized, setInitialized] = useState(false);
  const { coinCandles } = useGetInitialDataList();
  const newData = useNewData();

  useEffect(() => {
    chart = init("coin-chart", {
      styles: { grid: { horizontal: { style: LineType.Dashed } } }
    });

    const fetchData = () => {
      chart.applyNewData(coinCandles);
      setInitialized(true);
    };
    fetchData();
    return () => {
      dispose("coin-chart");
    };
  }, [coinCandles]);

  useEffect(() => {
    chart = init("coin-chart");
    if (initialized) {
      chart.updateData(newData);
      return () => {
        dispose("coin-chart");
      };
    }
  }, [newData]);

  return (
    <div>
      <div id="coin-chart" className="coin-chart" style={{ width: "100%", height: "30rem" }} />
      <div className="chart-menu-container">
        {types.map(({ key, text }) => {
          return (
            <StyleButton
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                chart &&
                  chart.setStyles({
                    candle: {
                      type: key as CandleType
                    }
                  });
              }}
            >
              {text}
            </StyleButton>
          );
        })}
      </div>
    </div>
  );
};
export default CoinChart;

const StyleButton = styled.button`
  background-color: #fff;
  color: gray;
  font-weight: 500;
  width: 4.5rem;
  height: 1.5rem;
  margin: 1rem 0.5rem 0 0;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
`;
