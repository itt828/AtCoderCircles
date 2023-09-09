import { css } from "styled-system/css";

export default function Tag({ name }: { name: string }) {
  return (
    <>
      <span
        className={css({
          border: "solid",
          borderColor: "amber.100",
          borderWidth: "1",
        })}
      >
        {name}
      </span>
    </>
  );
}
