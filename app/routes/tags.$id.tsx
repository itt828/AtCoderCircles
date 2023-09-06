import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const tag = await db.tag.findFirst({
    where: {
      id: params.id,
    },
  });
  return {
    tag,
  };
};
export default function Tag() {
  const { tag } = useLoaderData<typeof loader>();
  return (
    <>
      <div>{tag?.id}</div>
      <div>{tag?.name}</div>
    </>
  );
}
