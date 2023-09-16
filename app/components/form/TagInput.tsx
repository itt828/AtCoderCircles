import { useFieldArray } from "remix-validated-form";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function TagInput({
  name,
  formId,
}: {
  name: string;
  formId?: string;
}) {
  const [items, { push, remove }] = useFieldArray(name);
  return (
    <div>
      {items.map(({ defaultValue, key }, index) => (
        <div key={key}>
          <Input name={`${name}[${index}]`} />
          <Button
            type="button"
            onClick={() => {
              remove(index);
            }}
          >
            x
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          push("");
        }}
      >
        add
      </Button>
    </div>
  );
}
