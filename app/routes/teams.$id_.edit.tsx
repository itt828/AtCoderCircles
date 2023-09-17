import {
  type DataFunctionArgs,
  type LoaderArgs,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ValidatedForm, validationError } from "remix-validated-form";
import FormInput from "~/components/form/FormInput";
import FormTextarea from "~/components/form/FormTextarea";
import SubmitButton from "~/components/form/SubmitButton";
import TagInput from "~/components/form/TagInput";
import { teamValidator } from "~/models/team";
import { mergeUsers } from "~/models/user.server";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const team = await db.team.findFirst({
    where: {
      id: params.id,
    },
    select: {
      name: true,
      members: {
        select: {
          atcoderId: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    id: params.id,
    name: team?.name,
    members: team?.members.map((x) => x.atcoderId).join(","),
    tags: team?.tags.map((x) => x.name),
  };
};
export const action = async ({ request, params }: DataFunctionArgs) => {
  const data = await teamValidator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  const { teamName, members, tags } = data.data;

  const membersArray = members.match(/[a-zA-Z0-9_]+/g) as string[];

  await mergeUsers(membersArray);
  await db.team.update({
    where: {
      id: params.id,
    },
    data: {
      members: {
        set: [],
      },
      tags: {
        set: [],
      },
    },
  });
  const team = await db.team.update({
    where: {
      id: params.id,
    },
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

export default function TeamEdit() {
  const { name, members, tags } = useLoaderData<typeof loader>();
  return (
    <ValidatedForm
      validator={teamValidator}
      defaultValues={{ teamName: name, members, tags }}
      method="post"
    >
      <FormInput name="teamName" label="チーム名" />
      <FormTextarea name="members" label="メンバー" />
      <TagInput name="tags" />
      <SubmitButton />
    </ValidatedForm>
  );
}
