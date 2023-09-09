import { redirect, type ActionArgs } from "@remix-run/node";
import Button from "~/components/UI/Button";
import { mergeUsers } from "~/models/user.server";
import { db } from "~/utils/db.server";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { ValidatedForm } from "remix-validated-form";
import FormInput from "~/components/form/FormInput";
import FormTextarea from "~/components/form/FormTextarea";
import SubmitButton from "~/components/form/SubmitButton";

export const validator = withZod(
  z.object({
    teamName: z
      .string()
      .min(1, { message: "チーム名は少なくとも1文字以上にして下さい。" }),
    members: z.string(),
  })
);
export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const teamName = form.get("teamName") as string;
  const membersRaw = form.get("members") as string;

  const members = membersRaw.match(/[a-zA-Z0-9_]+/g) as string[];

  const membersDetail = await mergeUsers(members);

  const teams = await db.team.create({
    data: {
      name: teamName,
      members: {
        connect: members.map((v) => {
          return {
            atcoderId: v,
          };
        }),
      },
    },
  });
  return redirect(`/teams/${teams.id}`);
};
export default function TeamsNew() {
  return (
    <ValidatedForm validator={validator} method="post">
      <FormInput name="teamName" label="チーム名" />
      <FormTextarea name="members" label="メンバー(カンマ区切りで入力)" />
      <SubmitButton />
    </ValidatedForm>
  );
}
