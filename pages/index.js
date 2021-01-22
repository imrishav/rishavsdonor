import Head from "next/head";
import Dashboard from "../components/Dashboard";
import { Typography } from "antd";
import { useEffect } from "react";
import { withRouter } from "next/router";
import { useAppState } from "../components/shared/AppProvider";
const { Title } = Typography;

const OverviewPage = ({ router }) => {
  const [state] = useAppState();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/Dashboard");
    }
  }, []);
  return (
    <>
      {/* <Head>
        <link rel="stylesheet" href="/react-vis.css" />
      </Head> */}
      <div className="text-center mb-5">
        <Title>Dashboard</Title>
      </div>
      <Dashboard />
    </>
  );
};

export default withRouter(OverviewPage);
