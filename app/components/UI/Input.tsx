import { type ComponentProps } from "react";
import { css, cx } from "styled-system/css";

export default function Input({
  className,
  ...props
}: ComponentProps<"input">) {
  return <input className={cx(className, inputStyles)} {...props} />;
}

const inputStyles = css({
  borderColor: "cyan",
  borderWidth: "1px",
});
