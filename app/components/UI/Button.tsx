import { type ComponentProps } from "react";
import { css, cx } from "styled-system/css";

export default function Button({
  className,
  ...props
}: ComponentProps<"button">) {
  return <button className={cx(className, buttonStyles)} {...props}></button>;
}

const buttonStyles = css({
  borderColor: "cyan",
  borderWidth: "1px",
  "&:hover": {
    cursor: "pointer",
  },
});
