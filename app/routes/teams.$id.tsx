import { useLoaderData } from "@remix-run/react";
import { sampleUsers } from "~/models/user.server";

export const loader = async () => {
  return sampleUsers;
};
export default function Team() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      {data.map((user) => (
        <div key={user.atcoderId}>{user.atcoderId}</div>
      ))}
    </div>
  );
}
