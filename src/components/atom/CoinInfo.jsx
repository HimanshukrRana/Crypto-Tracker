import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { makeStyles } from "tss-react/mui";
import { HistoricalChart } from "../../config/api";
import { chartDays } from "../../config/data";
import { CryptoState } from "../../context";
import Button from "./Button";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [linechart, setLineChart] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const Fetchchartdata = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    // console.log(data, "histrocal");

    setLineChart(data.prices);
  };

  useEffect(() => {
    Fetchchartdata();
  }, [currency, days]);

  const useStyles = makeStyles()((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const { classes } = useStyles();

  return (
    <>
      <div className={classes.container}>
        {!linechart ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: linechart.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: linechart.map((coin) => coin[1]),
                    label: `Price (Past ${days}Days in${currency})`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  points: {
                    radius: 1,
                  },
                },
              }}
            />
          </>
        )}

        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => (
            <Button
              key={day.value}
              onClick={() => setDays(day.value)}
              selected={day.value === days}
            >
              {day.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoinInfo;
