import { Container, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import Carousel from "./Carousel";

const useStyles = makeStyles()((theme) => {
  return {
    banner: {
      backgroundImage: "url(./banner2.jpg)",
    },
    bannerContent: {
      height: 400,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
    tagline: {
      height: "40%",
      display: "flex",
      flexDirection: "column",

      justifyContent: "center",
      textAlign: "center",
    },
    heading: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "15px",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "45px",
      },
    },
  };
});

const Banner = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            className={classes.heading}
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "popins",
              color: "white",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            varient="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "popins",
            }}
          >
            Get all the Info regarding your favorite Crypto Currencies
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
