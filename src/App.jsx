import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/atom/Header";
import Home from "./pages/Home";
import CoinsPage from "./pages/CoinsPage";
import { makeStyles } from "tss-react/mui";
import Alert from "./components/atom/Alert";

const useStyles = makeStyles()(() => {
  return {
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  };
});

function App() {
  const { classes } = useStyles();
  return (
    <>
      <Alert />
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact="true" />
          <Route path="/coins/:id" element={<CoinsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

