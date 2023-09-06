import { Link, useLoaderData } from "@remix-run/react";
import { PieChart, Pie, Text, Cell, ResponsiveContainer } from "recharts";
import { colorCodeMap, mapByColor } from "~/libs/rating.server";
import Card from "~/components/card";
import { center, grid } from "styled-system/patterns";
import { type LoaderArgs, Response } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { css } from "styled-system/css";
import { Fragment } from "react";

export const loader = async ({ params }: LoaderArgs) => {
  const team = await db.team.findFirst({
    where: {
      id: params.id,
    },
    select: {
      name: true,
      members: true,
    },
  });
  if (!team) {
    throw new Response("Not found!", {
      status: 404,
    });
  }
  const colorUsersList = mapByColor(team.members);
  return {
    name: team.name,
    list: colorUsersList
      .map(([color, users]) => {
        return users.map((user) => {
          return {
            atcoderId: user.atcoderId,
            algorithmRating: user.algorithmRating,
            heuristicsRating: user.heuristicsRating,
            color: colorCodeMap.get(color)?.color,
          };
        });
      })
      .flat(),
    pie: colorUsersList
      .map(([color, users]) => {
        return {
          index: colorCodeMap.get(color)?.rank,
          name: color,
          value: users.length,
          color: colorCodeMap.get(color)?.color,
        };
      })
      .filter(({ value }) => value > 0),
  };
};
export default function Team() {
  const { name, list, pie } = useLoaderData<typeof loader>();
  const label = ({ name, value, color, cx, x, y }) => (
    <>
      <Text x={x} y={y} fill={color}>
        {name}
      </Text>
      <Text x={x} y={y} dominantBaseline="hanging" fill={color}>
        {value}
      </Text>
    </>
  );
  return (
    <>
      <h1 className={center({ fontSize: "3xl" })}>{name}</h1>
      <Link to="edit">編集</Link>
      <div className={gridStyles}>
        <Card>
          <div
            className={css({
              height: "full",
              padding: "3",
              overflowY: "auto",
            })}
          >
            <div className={grid({ columns: 3 })}>
              <div>ID </div>
              <div className={css({ textAlign: "right" })}>Algorithm</div>
              <div className={css({ textAlign: "right" })}>Heuristics</div>
              {list.map(
                ({ atcoderId, algorithmRating, heuristicsRating, color }) => (
                  <Fragment key={atcoderId}>
                    <div style={{ color: color }}>{atcoderId} </div>
                    <span className={css({ textAlign: "right" })}>
                      {algorithmRating}
                    </span>
                    <span className={css({ textAlign: "right" })}>
                      {heuristicsRating}
                    </span>
                  </Fragment>
                )
              )}
            </div>
          </div>
        </Card>
        <Card>
          <ResponsiveContainer width="100%">
            <PieChart>
              <Pie
                data={pie}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                // fill="#f31
                label={label}
              >
                {pie.map((data) => (
                  <Cell key={data.name} fill={data.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}

const gridStyles = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridAutoRows: "300px",
  gap: "4",
  padding: "4",
});
