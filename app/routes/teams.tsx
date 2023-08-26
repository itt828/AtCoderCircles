import { Outlet } from "@remix-run/react";
import { css } from "styled-system/css";

export default function TeamsRoute() {
  return (
    <div className={css({ margin: "40px 40px" })}>
      <Outlet />
    </div>
  );
}
