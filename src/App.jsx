import { Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Header from "./components/atom/Header";
// import Home from "./pages/Home";
// import CoinsPage from "./pages/CoinsPage";
import { makeStyles } from "tss-react/mui";
import Alert from "./components/atom/Alert";
import { Suspense } from "react";

const CoinsPage = React.lazy(() => import("./pages/CoinsPage"));

const Home = React.lazy(() => import("./pages/Home"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} exact="true" />
            <Route path="/coins/:id" element={<CoinsPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;

