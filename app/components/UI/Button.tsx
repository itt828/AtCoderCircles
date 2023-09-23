import { type ComponentProps } from "react";
import { css, cx } from "styled-system/css";

export default function Button({
  className,
  ...props
}: ComponentProps<"button">) {
  return <button className={cx(className, buttonStyles)} {...props}></button>;
}

const buttonStyles = css({
  borderRadius: "4px",
  p:"1",
  bg: "white",
  color: "neutral.600",
  boxShadow:
    "1px 1px 1px  0px rgba(0, 0, 0, 0.25), -1px -1px 1px 0px rgba(255, 255, 255, 0.00)",
});