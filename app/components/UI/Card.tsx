import { type SystemStyleObject } from "@pandacss/dev";
import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";

export default function Card({ children }: PropsWithChildren<{}>) {
  return <div className={css(cardStyle)} >{children}</div>;
}

const cardStyle: SystemStyleObject = {
  borderRadius: "8px",
  p:"2",
  bg: "white",
  boxShadow:
    "1px 1px 1px  0px rgba(0, 0, 0, 0.25), -1px -1px 1px 0px rgba(255, 255, 255, 0.00)",
};
