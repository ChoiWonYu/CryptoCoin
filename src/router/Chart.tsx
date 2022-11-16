import React from "react";
import { useQuery } from "react-query";
import { fetchChartInfo } from "../api";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";

interface IContext {
  coinId: string;
}
interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: number;
  volume: string;
  market_cap: number;
}
const Chart = () => {
  const { coinId } = useOutletContext<IContext>();
  const { data, isLoading } = useQuery<IHistorical[]>(["chart", coinId], () =>
    fetchChartInfo(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "sales",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
