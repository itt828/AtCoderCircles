import { redirect, type ActionArgs } from "@remix-run/node";
import Button from "~/components/button";
import Input from "~/components/input";
import TextArea from "~/components/textarea";
import { mergeUsers } from "~/models/user.server";
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const teamName = form.get("teamName") as string;
  const membersRaw = form.get("members") as string;

  const members = membersRaw.match(/[a-zA-Z0-9_]+/g) as string[];

  const membersDetail = await mergeUsers(members);
  console.log(members);
  console.log(membersDetail);
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
    <form method="post">
      <Input type="text" placeholder="チーム名" name="teamName" />
      <TextArea placeholder="メンバー" name="members" />
      <Input type="password" placeholder="パスワード" name="password" />
      <Button type="submit">作成</Button>
    </form>
  );
}
