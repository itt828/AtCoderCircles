import { useIsSubmitting } from "remix-validated-form";
import Button from "../UI/Button";

export default function SubmitButton() {
  const isSubmitting = useIsSubmitting();
  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Submitting..." : "Submit"}
    </Button>
  );
}
