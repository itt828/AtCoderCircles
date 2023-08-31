import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { css } from "styled-system/css";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const teams = await db.team.findMany();
  console.log(teams);
  return teams;
};

export default function TeamsRoute() {
  const teams = useLoaderData<typeof loader>();
  return (
    <div className={css({ margin: "40px 40px" })}>
      <div>
        {teams.map((v) => (
          <div>
            <Link to={`/teams/${v.id}`}>
              {v.name}: {v.id}
            </Link>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
