import { useField } from "remix-validated-form";
import { css } from "styled-system/css";
import Textarea from "../UI/Textarea";

export default function FormTextarea({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Textarea {...getInputProps({ id: name })} />
      {error && <span className={css({ color: "red.200" })}>{error}</span>}
    </div>
  );
}
