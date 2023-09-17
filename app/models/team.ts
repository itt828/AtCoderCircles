import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

export const teamValidator = withZod(
  z.object({
    teamName: z
      .string()
      .min(1, { message: "チーム名は少なくとも1文字以上にして下さい。" }),
    members: z.string(),
    tags: z.array(z.string()),
  })
);
