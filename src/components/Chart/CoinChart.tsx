import React, { useEffect } from "react";
import { init, dispose } from "klinecharts";
import useGetInitialDataList from "./useGetInitialDataList";

const CoinChart = () => {
  const { coinCandles } = useGetInitialDataList();

  // console.log(coinCandles);

  let chart: any;

  useEffect(() => {
    chart = init("coinChart");
    const fetchData = async () => {
      chart.applyNewData(coinCandles);
    };
    fetchData();
    return () => {
      dispose("chart");
    };
  }, [coinCandles]);

  return <div id="coinChart" className="coinChart" style={{ width: "1100px", height: "600px" }}></div>;
};
export default CoinChart;
