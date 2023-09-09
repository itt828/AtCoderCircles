import { useState } from "react";
import { useFieldArray } from "remix-validated-form";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function TagInput({
  name,
  formId,
  value,
}: {
  name: string;
  formId?: string;
  value?: string[];
}) {
  const [items, { push, remove }] = useFieldArray(name, { formId });
  const [newTagName, setNewTagName] = useState("");
  return (
    <>
      {items.map(({ defaultValue, key }, index) => (
        <div key={key}>
          <span>{defaultValue}</span>
          {/* <div>{key}</div> */}
          <Button
            onClick={() => {
              remove(index);
            }}
          >
            x
          </Button>
        </div>
      ))}
      <Input
        name="newTag"
        value={newTagName}
        onChange={(e) => setNewTagName(e.target.value)}
      />
      <Button
        onClick={() => {
          push(newTagName);
          setNewTagName("");
        }}
      >
        add
      </Button>
    </>
  );
}
