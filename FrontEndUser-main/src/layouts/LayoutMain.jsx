import { NavBarMain } from "../components/NavBarMain";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

import { Loading } from "../pages/Loading/Loading";
import { FooterMain } from "../components/FooterMain";
import { calc } from "antd/es/theme/internal";

export function LayoutMain() {
  const { state } = useNavigation();

  return (
    <>
      <NavBarMain />
      {state === "loading" ? (
        <Loading />
      ) : (
        <>
          <ScrollRestoration />
          <div
            style={{
              paddingTop: "4rem",
              minHeight: "calc(100vh - 4rem - 138px)",
            }}
          >
            <Outlet />
          </div>
          <div style={{ paddingTop: "4rem" }}>
            <FooterMain />
          </div>
        </>
      )}
    </>
  );
}
