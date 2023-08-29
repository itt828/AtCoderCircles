import { redirect, type ActionArgs } from "@remix-run/node";
import Button from "~/components/button";
import Input from "~/components/input";
import TextArea from "~/components/textarea";
import { ATCODER_ID_REGEXP, mergeUsers } from "~/models/user.server";
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const teamName = form.get("teamName") as string;
  const membersRaw = form.get("members") as string;

  const members = membersRaw.match(/[a-zA-Z0-9_]+/g) as string[];

  await mergeUsers(members);

  return redirect(`teams/${id}`);
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
