import { css } from "styled-system/css";

export default function Tag({ name }: { name: string }) {
  return (
    <>
      <span
        className={tagStyle}
      >
        {name}
      </span>
    </>
  );
}

const tagStyle = css({
  borderRadius: "4px",
  p:"1",
  bg: "white",
  color: "neutral.600",
  boxShadow:
    "1px 1px 1px  0px rgba(0, 0, 0, 0.25), -1px -1px 1px 0px rgba(255, 255, 255, 0.00)",
});