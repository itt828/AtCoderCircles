import { type SystemStyleObject } from "@pandacss/dev";
import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";

export default function Card({ children }: PropsWithChildren<{}>) {
  return <div className={css(cardStyle)}>{children}</div>;
}

const cardStyle: SystemStyleObject = {
  borderRadius: "20px",
  bg: "white",
};
