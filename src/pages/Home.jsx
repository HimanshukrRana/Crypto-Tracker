import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Banner from "../components/molecules/Banner";
import Fallback from "../components/organisms/ErrorBoundary";
// import CoinsTable from "../components/molecules/CoinsTable";

const CoinsTable = React.lazy(() =>
  import("../components/molecules/CoinsTable")
);

const Home = () => {
  return (
    <div>
      <Banner />
      <ErrorBoundary
        FallbackComponent={Fallback}
        onReset={(details) => {
          // Reset the state of your app so the error doesn't happen again
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
