import {
  AppBar,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import { Link } from "react-router-dom";
import { CryptoState } from "../../context";
import AuthModal from "../Auth/AuthModal";
import SideBar from "../Auth/SideBar";

const useStyles = makeStyles()(() => {
  return {
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Poppins",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "30px",
    },
    select: {
      width: "120px",
      height: "40px",
      borderColor: "gold",
    },
    label: {
      color: "gold",
      fontFamily: "Poppins",
      fontWeight: "bold",
      cursor: "pointer",
      top: "-7px",
    },
  };
});

function Header() {
  const { classes } = useStyles();

  const { currency, setCurrency, user } = CryptoState();

  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Link to={"/"} className={classes.title}>
            <Typography className={classes.title}>Crypto Tracker</Typography>
          </Link>

          <FormControl>
            <InputLabel id="demo-simple-select-label" className={classes.label}>
              Currency
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              label="Currency"
              className={classes.select}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>US</MenuItem>
            </Select>
          </FormControl>
          {user ? <SideBar /> : <AuthModal />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
