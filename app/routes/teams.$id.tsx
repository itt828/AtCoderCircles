import { useLoaderData } from "@remix-run/react";
import { type User, sampleUsers } from "~/models/user.server";
import { PieChart, Pie, Text, Cell } from "recharts";
import { type Color, colorCodeMap, mapByColor } from "~/libs/rating.server";
import Card from "~/components/card";
import { grid } from "styled-system/patterns";
import { LoaderArgs, Response } from "@remix-run/node";
import { db } from "~/utils/db.server";

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
    <div className={grid({ columns: 1 })}>
      <Card>
        {list.map(({ color, colorCode, count, users }) => (
          <div key={color}>
            {users.map((user) => (
              <div key={user.atcoderId}>
                <span style={{ color: colorCode }}>{user.atcoderId} </span>:{" "}
                {user.algorithmRating}
              </div>
            ))}
          </div>
        ))}
      </Card>
      <Card>
        <PieChart width={730} height={300}>
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
