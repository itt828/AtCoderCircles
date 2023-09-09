import { type ComponentProps } from "react";
import { css, cx } from "styled-system/css";

export default function Textarea({
  className,
  ...props
}: ComponentProps<"textarea">) {
  return (
    <textarea className={cx(textAreaStyles, className)} {...props}></textarea>
  );
}

const textAreaStyles = css({
  borderColor: "cyan",
  borderWidth: "1px",
});
