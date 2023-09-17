import { redirect, type DataFunctionArgs } from "@remix-run/node";
import { mergeUsers } from "~/models/user.server";
import { db } from "~/utils/db.server";
import { ValidatedForm, validationError } from "remix-validated-form";
import FormInput from "~/components/form/FormInput";
import FormTextarea from "~/components/form/FormTextarea";
import SubmitButton from "~/components/form/SubmitButton";
import TagInput from "~/components/form/TagInput";
import { useActionData } from "@remix-run/react";
import { teamValidator } from "~/models/team";

export const action = async ({ request }: DataFunctionArgs) => {
  const data = await teamValidator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const { teamName, members, tags } = data.data;

  const membersArray = members.match(/[a-zA-Z0-9_]+/g) as string[];

  await mergeUsers(membersArray);

  const team = await db.team.create({
    data: {
      name: teamName,
      members: {
        connect: membersArray.map((v) => {
          return {
            atcoderId: v,
          };
        }),
      },
      tags: {
        connectOrCreate: tags.map((tag) => {
          return {
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          };
        }),
      },
    },
  });
  return redirect(`/teams/${team.id}`);
};
export default function TeamsNew() {
  const data = useActionData();
  return (
    <ValidatedForm validator={teamValidator} method="post">
      <FormInput name="teamName" label="チーム名" />
      <FormTextarea name="members" label="メンバー(カンマ区切りで入力)" />
      <TagInput name="tags" />
      {data && (
        <span>
          {data.title},{data.description}
        </span>
      )}
      <SubmitButton />
    </ValidatedForm>
  );
}
