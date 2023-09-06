import { Outlet, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const tags = await db.tag.findMany();
  return { tags };
};

export default function Tags() {
  const { tags } = useLoaderData<typeof loader>();
  return (
    <>
      <main>
        <Outlet />
      </main>
      <h2>タグ一覧</h2>
      {tags.map((tag) => (
        <>
          <div>{tag.id}</div>
          <div>{tag.name}</div>
        </>
      ))}
    </>
  );
}
