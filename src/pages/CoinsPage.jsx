import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../context";

import CoinInfo from "../components/atom/CoinInfo";
import { Button, LinearProgress, Typography } from "@mui/material";

import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/molecules/Carousel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const CoinsPage = () => {
  const { id } = useParams();

  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const useStyles = makeStyles()((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    header: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "popins",
    },
    heading: {
      fontWeight: "bold",
      // marginBottom: 20,
      fontFamily: "popins",
      display: "flex",

      alignItems: "center",
    },
    desc: {
      width: "100%",
      fontFamily: "popins",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    data: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
    // add: {
    //   height: "30%",
    //   width: "100%",
    //   backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
    //   marginTop: 20,
    //   color: black,
    // },
  }));

  const { classes } = useStyles();

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinref = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinref, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });

      setAlert({
        open: true,
        message: `${coin.name} Added to the WatchList !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removefromWatchlist = async () => {
    const coinref = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinref,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: "true" }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the WatchList !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        {/* sidebar */}
        <img
          src={coin?.image.large}
          alt={coin.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.header}>
          {coin.name}
        </Typography>
        <Typography variant="h5" className={classes.desc}>
          {coin?.description.en.split(". ")[0]}
        </Typography>
        <div className={classes.data}>
          <span
            style={{
              display: "flex",
              borderBottom: "2px solid #f2f2f2",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>

            <Typography variant="h5" style={{ fontFamily: "popins" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span
            style={{
              display: "flex",
              borderBottom: "2px solid #f2f2f2",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>

            <Typography variant="h5" style={{ fontFamily: "popins" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span
            style={{
              display: "flex",
              borderBottom: "2px solid #f2f2f2",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>

            <Typography variant="h5" style={{ fontFamily: "popins" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              style={{
                height: "30%",
                width: "100%",
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",

                color: "black",
              }}
              onClick={inWatchlist ? removefromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from WatchList" : "Add to WatchList"}
            </Button>
          )}
        </div>
      </div>

      {/* chart */}

      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinsPage;
