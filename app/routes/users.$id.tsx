import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const user = await db.user.findFirst({
    where: {
      atcoderId: params.id,
    },
  });
  return {
    user,
  };
};

export default function User() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <div>{user?.atcoderId}</div>
      <div>{user?.algorithmRating}</div>
      <div>{user?.heuristicsRating}</div>
    </>
  );
}
