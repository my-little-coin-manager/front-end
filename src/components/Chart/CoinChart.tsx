import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { init, dispose } from "klinecharts";
import useGetInitialDataList from "../../Hooks/useGetInitialDataList";
import useNewData from "../../Hooks/useNewData";

const CoinChart = () => {
  let chart: any;
  const [initialized, setInitialized] = useState(false);
  const { coinCandles } = useGetInitialDataList();
  const newData = useNewData();

  // console.log(initialized);

  // console.log(coinCandles);

  useEffect(() => {
    chart = init("coinChart");
    const fetchData = () => {
      chart.applyNewData(coinCandles);
      setInitialized(true);
    };
    fetchData();
    // return () => {
    //   dispose("chart");
    // };
  }, [coinCandles]);

  useEffect(() => {
    chart = init("coinChart");
    if (initialized) {
      chart.updateData(newData);
    }
  }, [newData]);

  return <div id="coinChart" style={{ width: "1100px", height: "550px" }}></div>;
};
export default CoinChart;
