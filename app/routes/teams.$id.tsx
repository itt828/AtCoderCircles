import { useLoaderData } from "@remix-run/react";
import { type User, sampleUsers } from "~/models/user.server";
import { PieChart, Pie, Text, Cell } from "recharts";
import { type Color, colorCodeMap, mapByColor } from "~/libs/rating.server";
import Card from "~/components/card";
import { grid } from "styled-system/patterns";
import { LoaderArgs, Response } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { css } from "styled-system/css";

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
    list: colorUsersList.map(([color, users]) => {
      const item: {
        color: Color;
        colorCode?: string;
        count: number;
        users: User[];
      } = {
        color: color,
        colorCode: colorCodeMap.get(color)?.color,
        count: users.length,
        users: users,
      };
      return item;
    }),
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
  const { list, pie } = useLoaderData<typeof loader>();
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
    <div className={gridStyles}>
      <Card>
        <div className={grid({ columns: 3 })}>
          <span className={css({ width: "100px", marginRight: "6px" })}>
            ID{" "}
          </span>
          <span
            className={css({
              width: "32px",
              marginRight: "6px",
              textAlign: "right",
            })}
          >
            Algorithm
          </span>
          <span
            className={css({
              width: "32px",
              marginRight: "6px",
              textAlign: "right",
            })}
          >
            Heuristics
          </span>
        </div>
        {list.map(({ color, colorCode, count, users }) => (
          <div key={color}>
            {users.map((user) => (
              <div key={user.atcoderId} className={grid({ columns: 3 })}>
                <span
                  style={{ color: colorCode }}
                  className={css({ width: "100px", marginRight: "6px" })}
                >
                  {user.atcoderId}{" "}
                </span>
                <span
                  className={css({
                    width: "32px",
                    marginRight: "6px",
                    textAlign: "right",
                  })}
                >
                  {user.algorithmRating}
                </span>
                <span
                  className={css({
                    width: "32px",
                    marginRight: "6px",
                    textAlign: "right",
                  })}
                >
                  {user.heuristicsRating}
                </span>
              </div>
            ))}
          </div>
        ))}
      </Card>
      <Card>
        <PieChart width={430} height={300}>
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
      </Card>
    </div>
  );
}

const gridStyles = css({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridAutoRows: "300px",
  gap: "4",
});

const hogeStyles = css({
  backgroundColor: "blue.400",
});
