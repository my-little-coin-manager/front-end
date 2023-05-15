import React, { useEffect, useState } from "react";
import { init, dispose, LineType, Chart } from "klinecharts";
import useGetCoinCandles from "../../../hooks/chart/useGetInitCoinCandles";
import useNewData from "../../../hooks/chart/useNewData";

const ChartBlock = () => {
  let chart: Chart | any;
  const [initialized, setInitialized] = useState(false);
  const { data: coinCandles } = useGetCoinCandles();
  const newData = useNewData();

  useEffect(() => {
    if (coinCandles) {
      chart = init("coin-chart");
      const fetchData = () => {
        chart?.applyNewData(coinCandles);
        setInitialized(true);
      };

      fetchData();
    }

    return () => {
      dispose("coin-chart");
    };
  }, [coinCandles]);

  useEffect(() => {
    chart = init("coin-chart", {
      styles: {
        grid: { horizontal: { style: LineType.Dashed } },
        candle: {
          bar: {
            upColor: "#d24f45",
            downColor: "#1261c4",
            noChangeColor: "#888888"
          }
        }
      }
    });

    if (initialized) {
      chart?.updateData(newData);
    }

    return () => {
      dispose("coin-chart");
    };
  }, [newData]);

  return (
    <div>
      <div id="coin-chart" className="coin-chart" style={{ width: "100%", height: "30rem" }} />
      <div className="chart-menu-container"></div>
    </div>
  );
};
export default ChartBlock;
