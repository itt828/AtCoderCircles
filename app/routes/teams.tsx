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
    <>
      <main className={css({ bg: "gray.100" })}>
        <Outlet />
      </main>
      <div className={css({ bg: "blue.100" })}>
        <h2 className={css({ fontSize: "2xl" })}>チーム一覧</h2>
        <div>
          <input placeholder="検索" />
        </div>
        {teams.map((v) => (
          <div key={v.id}>
            <Link to={`/teams/${v.id}`}>
              {v.name}: {v.id}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
