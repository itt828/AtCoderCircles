import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import Tag from "~/components/UI/Tag";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const teams = await db.team.findMany({
    select: {
      id: true,
      name: true,
      teamAlgorithmRating: true,
      teamHeuristicsRating: true,
      tags: true,
    },
  });
  return teams;
};

export default function TeamsRoute() {
  const teams = useLoaderData<typeof loader>();
  return (
    <>
      <header className={css({ marginY: "4" })}>
        <Link to="/">
          <h1>Atcoder Circles</h1>
        </Link>
      </header>
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
                    {v.tags.map((tag) => (
                      <div key={tag.id}>
                        <Link to={`/tags/${tag.id}`}>
                          <Tag name={`#${tag.name}`} />
                        </Link>
                      </div>
                    ))}
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
