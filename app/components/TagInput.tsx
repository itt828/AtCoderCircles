import { useFieldArray } from "remix-validated-form";

export default function TagInput({
  name,
  value,
}: {
  name: string;
  value: string[];
}) {
  const [items, { push, remove }] = useFieldArray("tags", {
    formId: "tag-input",
  });
  return (
    <>
      {items.map(({ defaultValue, key }, index) => (
        <>
          <div>{defaultValue}</div>
          <div>{key}</div>
          <button
            onClick={() => {
              remove(index);
            }}
          >
            x
          </button>
        </>
      ))}
      <input />
      <button onClick={() => push("")}>add</button>
    </>
  );
}
