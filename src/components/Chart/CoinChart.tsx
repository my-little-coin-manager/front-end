import React, { useEffect, useState } from "react";
import { init, dispose } from "klinecharts";
import useGetInitialDataList from "../../Hooks/useGetInitialDataList";
import { liveCandleData } from "recoil/atoms";
import useNewData from "../../Hooks/useNewData";

const CoinChart = () => {
  const [initialized, setInitialized] = useState(false);
  const { coinCandles } = useGetInitialDataList();
  const newData = useNewData();

  // console.log(newData);

  // console.log(coinCandles);

  let chart: any;

  useEffect(() => {
    chart = init("coinChart");
    const fetchData = async () => {
      chart.applyNewData(coinCandles);
      setInitialized(true);
    };
    fetchData();
    return () => {
      dispose("chart");
    };
  }, [coinCandles]);

  useEffect(() => {
    chart = init("coinChart");
    if (initialized) {
      chart.updateData(newData);
    }
  }, [newData]);

  return <div id="coinChart" className="coinChart" style={{ width: "1100px", height: "550px" }}></div>;
};
export default CoinChart;
