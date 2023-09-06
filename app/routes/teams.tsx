import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import Tag from "~/components/tag";
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
        <Link to="/teams/new">+ チーム作成</Link>
        <div>
          <input placeholder="検索" />
        </div>
        <div className={flex({ direction: "column", gap: "4" })}>
          {teams.map((v) => (
            <div key={v.id}>
              <Link to={`/teams/${v.id}`}>
                <div className={css({ display: "flex", gap: "4" })}>
                  <div className={css({ width: "20" })}>{v.name}</div>
                  <div className={flex({ direction: "row", gap: "2" })}>
                    <Tag name="#ほげほげ" />
                    <Tag name="#ほげほげ" />
                    <Tag name="#ほげほげ" />
                    <Tag name="#ほげほげ" />
                    <Tag name="#ほげほげ" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
