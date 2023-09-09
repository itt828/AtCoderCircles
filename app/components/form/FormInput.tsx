import { useField } from "remix-validated-form";
import Input from "../UI/Input";
import { css } from "styled-system/css";

export default function FormInput({
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
      <Input {...getInputProps({ id: name })} />
      {error && <span className={css({ color: "red.200" })}>{error}</span>}
    </div>
  );
}
